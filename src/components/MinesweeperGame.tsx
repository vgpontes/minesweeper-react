import { useEffect, useRef, useState } from "react";
import { Minesweeper, MinesweeperProps, TileInfo } from "../utils/Minesweeper"
import { Tile } from "./Tile"
import { debounce } from "lodash"
import { FlagBox } from "./FlagBox";
import "./Minesweeper.css"
import { Smiley } from "./Smiley";

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

      const tileSize = 50; // Adjust as needed for tile size

      return (
        <div style={{
            height: "100%", 
            width: "100%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexDirection: "column"
            }}>
            <Smiley gameStatus={gameStatus} hold={isHold}/>
            <FlagBox numFlags={numFlags - numFlagsPlaced}/>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${props.boardWidth}, ${tileSize}px)`, gridAutoRows: `${tileSize}px` }}>
                {board.map((row, rowIndex) => (
                    row.map((tile, colIndex) => (
                    <Tile
                        key={`${rowIndex}-${colIndex}`}
                        tileInfo={tile}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        tileSize={tileSize}
                        gameStatus={gameStatus}
                        onClick={onTileClick}
                        onRightClick={onTileRightClick}
                        onHold={() => setIsHold(true)}
                    />))
                ))}
            </div>
        </div>
    )
    
}