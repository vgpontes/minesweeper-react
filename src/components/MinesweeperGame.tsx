import React from "react";
import { Minesweeper, MinesweeperProps } from "../utils/Minesweeper"
import { Tile } from "./Tile"

export default function MinesweeperGame(props:MinesweeperProps) {
    const board = new Minesweeper(props).board;
    const boardWidth = board[0].length;
    const boardHeight = board.length;
    return (
        <div className="Container">
          <button className="Tile">1</button>
        </div>
      );
    return (
        <div className="Container" style={{'--boardWidth': boardWidth, '--boardHeight': boardHeight} as any}>
            {
                board.map((row, rowIndex) => (
                    <div key={rowIndex} className="Row">
                        {row.map((tile, colIndex) => (
                            <Tile key={`${rowIndex}${colIndex}`}/>
                        ))}
                    </div>
                ))
            }
        </div>
    );
}