import { useEffect, useState } from "react";
import { Minesweeper, MinesweeperProps } from "../../utils/Minesweeper"
import Tile from "../Tile/Tile"
import FlagBox from "../FlagBox/FlagBox";
import "./Minesweeper.css"
import Smiley from "../Smiley/Smiley";

export enum GAME_STATUS {
    InProgress,
    Win,
    Lose
}

export default function MinesweeperGame(props:MinesweeperProps) {
    const [game, setGame] = useState(new Minesweeper(props))
    const [firstPress, setFirstPress] = useState(true);
    const [revealCount, setRevealCount] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.InProgress);
    const [board, setBoard] = useState(game.board);
    const [numFlagsPlaced, setNumFlagsPlaced] = useState(0);
    const [isHold, setIsHold] = useState(false);
    const [tileSize, setTileSize] = useState(50);
    const numFlags = game.getNumMines();

    const onTileClick = (rowIndex:number, colIndex:number) => {
        if (board[rowIndex][colIndex].isRevealed ||
            board[rowIndex][colIndex].isFlagged) return;

        if (firstPress) {
            game.placeMines(rowIndex, colIndex);
            setFirstPress(false);
        }
        var newBoard = [...game.board];
        var countObj = { val: revealCount };
        game.revealTile(rowIndex, colIndex, countObj);

        const newRevealCount = countObj.val;
        setRevealCount(newRevealCount);
        if (newBoard[rowIndex][colIndex].isMine) {
            // Reveal all bomb locations
            game.getMineCoordinates().forEach((coordinate) => {
                game.revealBomb(coordinate.x, coordinate.y);
            });
            console.log("You Lose");
            setGameStatus(GAME_STATUS.Lose);
        }
        else if (newRevealCount == (props.boardHeight * props.boardWidth - game.getNumMines())) {
            console.log("You Win");
            setGameStatus(GAME_STATUS.Win);
        }
        setBoard(newBoard);
        setIsHold(false)
    }

    const onTileRightClick = (rowIndex : number, colIndex : number) => {
        const newBoard = [...board];
        const tileIsFlagged = newBoard[rowIndex][colIndex].isFlagged
        newBoard[rowIndex][colIndex].isFlagged = !tileIsFlagged
        const newFlagsPlaced = tileIsFlagged ? numFlagsPlaced - 1 : numFlagsPlaced + 1;
        setNumFlagsPlaced(newFlagsPlaced);
        setBoard(newBoard);
        setIsHold(false)
    }

    useEffect(() => {
        const handleResize = () => {
            // Calculate the tile size based on the screen width and the number of tiles in a row
            const parent = document.getElementById("container")!.parentElement!;
            const smileyHeight = document.getElementById("smiley")!.clientHeight;
            const flagBoxHeight = document.getElementById("flagbox")!.clientHeight;
            const tileSize = Math.min(parent.clientWidth / props.boardWidth, (parent.clientHeight - smileyHeight - flagBoxHeight - 50) / props.boardHeight);
            setTileSize(tileSize);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const resetGame = () => {
        const newGame = new Minesweeper({boardHeight: props.boardHeight, boardWidth: props.boardWidth, numMines: numFlags});
        setGame(newGame);
        setBoard(newGame.board);
        setRevealCount(0);
        setFirstPress(true);
        setGameStatus(GAME_STATUS.InProgress);
        setNumFlagsPlaced(0);
    };

    return (
        <div style={{
            height: "100%", 
            width: "100%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexDirection: "column"
            }}>
            <Smiley gameStatus={gameStatus} hold={isHold} onMouseDown={resetGame}/>
            <FlagBox numFlags={numFlags - numFlagsPlaced}/>
            <div id="container" style={{ display: "grid", gridTemplateColumns: `repeat(${props.boardWidth}, ${tileSize}px)`, gridAutoRows: `${tileSize}px` }}
                onMouseLeave={() => setIsHold(false)}>
                {board.map((row, rowIndex) => (
                    row.map((tile, colIndex) => (
                    <Tile
                        key={`${rowIndex}-${colIndex}`}
                        tileInfo={tile}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        gameStatus={gameStatus}
                        onClick={onTileClick}
                        onRightClick={onTileRightClick}
                        setIsHold={setIsHold}
                    />))
                ))}
            </div>
        </div>
    );
}