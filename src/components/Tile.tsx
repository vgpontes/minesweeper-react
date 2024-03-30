import { useEffect } from "react";
import "./Minesweeper.css"

export interface TileProps {
    rowIndex: number,
    colIndex: number
}

export function Tile(props:TileProps) {
    
    return (
        <button className="Tile">
            1
        </button>
    )
}