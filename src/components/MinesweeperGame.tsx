import { useEffect } from "react";
import { Minesweeper, MinesweeperProps } from "../utils/Minesweeper"
import { Tile } from "./Tile"

export default function MinesweeperGame(props:MinesweeperProps) {
    const board = new Minesweeper(props).board;
    const boardWidth = board[0].length;
    const boardHeight = board.length;

    const setContainerSquareDimensions = () => {
        const container = document.getElementById('container')!;
        const parent = container.parentElement;
        if (parent) {
            if (parent.clientHeight < parent.clientWidth) {
                container.style.height = "100%";
                container.style.width = container.clientHeight + "px";
            } else {
                container.style.height = container.clientWidth + "px";
                container.style.width = "100%";
            }
        }
    }

    useEffect(() => {
        setContainerSquareDimensions();
        window.addEventListener('resize', setContainerSquareDimensions);
        return () => {
            window.removeEventListener('resize', setContainerSquareDimensions);
        };
    }, []); // Empty dependency array to only add and remove the event listener once

    return (
        <div id="container"></div>
    )

    return (
        <div id="Container"className="Container">
            {
                board.map((row, rowIndex) => (
                    <div key={rowIndex} className="Row">
                        {row.map((tile, colIndex) => (
                            <Tile key={`${rowIndex}${colIndex}`} rowIndex={rowIndex} colIndex={colIndex}/>
                        ))}
                    </div>
                ))
            }
        </div>
    );
}