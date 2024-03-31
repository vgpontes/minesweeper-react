import { useEffect, useState } from "react";
import { Minesweeper, MinesweeperProps } from "../utils/Minesweeper"
import { Tile } from "./Tile"
import { debounce } from "lodash"

export default function MinesweeperGame(props:MinesweeperProps) {
    const [tileSize, setTileSize] = useState(0);
    const game = new Minesweeper(props);
    const board = game.board;
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
                            minesNearby={tile}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}