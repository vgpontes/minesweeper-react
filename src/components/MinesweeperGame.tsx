import { useEffect, useState } from "react";
import { Coordinate, Minesweeper, MinesweeperProps } from "../utils/Minesweeper"
import { Tile } from "./Tile"
import { debounce } from "lodash"

export enum GAME_STATUS {
    InProgress,
    Win,
    Lose
}

export default function MinesweeperGame(props:MinesweeperProps) {
    const [game, setGame] = useState(new Minesweeper(props))
    const [tileSize, setTileSize] = useState(0);
    const [firstPress, setFirstPress] = useState(true);
    const [revealCount, setRevealCount] = useState(0);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.InProgress);
    const [board, setBoard] = useState(game.board);
    const [numFlagsPlaced, setNumFlagsPlaced] = useState(0);
    const boardWidth = board[0].length;
    const boardHeight = board.length;

    useEffect(() => {
        const container = document.getElementById('container')!;
        const parent = container.parentElement!;
    
        const resizeObserver = new ResizeObserver(debounce((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                let newTileSize;
                if (width < height) {
                    container.style.width = width + "px";
                    container.style.height = width + "px";
                    newTileSize = width / boardHeight;
                } else {
                    container.style.width = height + "px";
                    container.style.height = height + "px";
                    newTileSize = height / boardWidth;
                }
                setTileSize(newTileSize);
            }

        }));
    
        resizeObserver.observe(parent);
    
        return () => {
            resizeObserver.unobserve(parent);
        };
    }, []);

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
                game.revealTile(coordinate.x, coordinate.y);
            });
            console.log("You Lose");
            setGameStatus(GAME_STATUS.Lose);
        }
        else if (newRevealCount == (boardHeight * boardWidth - game.getNumMines())) {
            console.log("You Win");
            setGameStatus(GAME_STATUS.Win);
        }
        setBoard(newBoard);
    }

    const onTileRightClick = (rowIndex : number, colIndex : number) => {
        const newBoard = [...board];
        const tileIsFlagged = newBoard[rowIndex][colIndex].isFlagged
        newBoard[rowIndex][colIndex].isFlagged = !tileIsFlagged
        const newFlagsPlaced = tileIsFlagged ? numFlagsPlaced - 1 : numFlagsPlaced + 1;
        setNumFlagsPlaced(newFlagsPlaced);
        setBoard(newBoard);
    }

    return (
        <div id="container" style={{ gridTemplateColumns: `repeat(${boardWidth * boardHeight}, ${tileSize}px)` }}>
            {
            board.map((row, rowIndex) => (
                <div key={rowIndex} className="Row">
                    {row.map((tile, colIndex) => (
                        <Tile key={`${rowIndex}${colIndex}`} 
                            rowIndex={rowIndex} 
                            colIndex={colIndex} 
                            tileSize={tileSize}
                            tileInfo={tile}
                            onClick={onTileClick}
                            onRightClick={onTileRightClick}
                            gameStatus={gameStatus}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}