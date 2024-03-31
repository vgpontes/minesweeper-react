import { useEffect } from "react";
import { Minesweeper, MinesweeperProps } from "../utils/Minesweeper"
import { Tile } from "./Tile"
import { debounce } from "lodash"

export default function MinesweeperGame(props:MinesweeperProps) {
    const board = new Minesweeper(props).board;
    const boardWidth = board[0].length;
    const boardHeight = board.length;

    useEffect(() => {
        const container = document.getElementById('container')!;
        const parent = container.parentElement!;
    
        const resizeObserver = new ResizeObserver(debounce((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                const size = Math.round(Math.min(width, height));
                container.style.width = size + "px";
                container.style.height = size + "px";
            }
        }));
    
        resizeObserver.observe(parent);
    
        return () => {
            resizeObserver.unobserve(parent);
        };
    }, []);

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