import { useEffect, useRef, useState } from "react";
import { Minesweeper, MinesweeperProps } from "./Minesweeper"
import Tile from "../Tile/Tile"
import FlagBox from "../FlagBox/FlagBox";
import "./Minesweeper.css"
import Smiley from "../Smiley/Smiley";
import { GAME_STATUS } from "./GameStatus";

export default function MinesweeperGame(props:MinesweeperProps) {
    const [game, setGame] = useState(new Minesweeper(props))
    const [firstPress, setFirstPress] = useState(true);
    const [revealCount, setRevealCount] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.InProgress);
    const [board, setBoard] = useState(game.board);
    const [numFlagsPlaced, setNumFlagsPlaced] = useState(0);
    const [isHold, setIsHold] = useState(false);
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
        if (gameStatus !== GAME_STATUS.InProgress || board[rowIndex][colIndex].isRevealed) return;
        
        const newBoard = [...board];
        const tileIsFlagged = newBoard[rowIndex][colIndex].isFlagged
        newBoard[rowIndex][colIndex].isFlagged = !tileIsFlagged
        const newFlagsPlaced = tileIsFlagged ? numFlagsPlaced - 1 : numFlagsPlaced + 1;
        setNumFlagsPlaced(newFlagsPlaced);
        setBoard(newBoard);
        setIsHold(false)
    }

    const resetGame = () => {
        const newGame = new Minesweeper({boardHeight: props.boardHeight, boardWidth: props.boardWidth, numMines: numFlags});
        setGame(newGame);
        setBoard(newGame.board);
        setRevealCount(0);
        setFirstPress(true);
        setGameStatus(GAME_STATUS.InProgress);
        setNumFlagsPlaced(0);
    };

    const parentRef = useRef<HTMLDivElement>(null);
    const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
          if (parentRef.current) {
            setParentDimensions({
              width: parentRef.current.offsetWidth,
              height: parentRef.current.offsetHeight
            });
          }
        };
    
        const resizeObserver = new ResizeObserver(handleResize);
        if (parentRef.current) {
          resizeObserver.observe(parentRef.current);
        }

        handleResize();

        return () => {
            if (parentRef.current) {
              resizeObserver.unobserve(parentRef.current);
            }
          };
    }, []);

    const { width, height } = parentDimensions;
    const isParentWider = width > height;
    
    return (
        <div ref={parentRef} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
            <div id="smile-flag" style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Smiley gameStatus={gameStatus} hold={isHold} onMouseDown={resetGame}/>
                <FlagBox numFlags={numFlags - numFlagsPlaced}/>
            </div>
            <div style={{
                display: "grid", 
                gridTemplateColumns: `repeat(${props.boardWidth}, 1fr)`, 
                backgroundColor: "blue", 
                height: isParentWider ? "100%" : 'auto', 
                width: isParentWider ? 'auto' : "100%",}}>
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
                />
                )
            )))}
            </div>
        </div>
    );
}
