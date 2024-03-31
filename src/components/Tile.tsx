import { useState } from "react";
import { TileInfo } from "../utils/Minesweeper"
import "./Minesweeper.css"
import { GAME_STATUS } from "./MinesweeperGame";

export interface TileProps {
    tileInfo : TileInfo,
    rowIndex: number,
    colIndex: number,
    tileSize: number,
    gameStatus: GAME_STATUS
    onClick: (i:number, j:number) => void
}

export function Tile(props:TileProps) {
    const [isMouseHovering, setMouseHovering] = useState(false);
    const {minesNearby, isFlagged, isRevealed, isMine} = props.tileInfo;
    
    const onClick = () => {
        console.log(`Clicked ${props.rowIndex}-${props.colIndex}`);
        props.onClick(props.rowIndex, props.colIndex);
    }

    const onRightClick = () => {
        
    }

    const tileText = () => {
        if (isFlagged) {
            //return <MaterialCommunityIcons name="flag-variant" color="red" size={24}/>
            return "\u{1F6A9}";
        }
        if (!isRevealed) {
            return null;
        }
        if (isMine) {
            //return <MaterialCommunityIcons name="bomb" size={24} color="black" />
            return "\u{1F4A3}";
        }
        const fontColor = new Map([[1, "blue"], [2, "green"], [3, "red"], [4, "purple"]]);
        return minesNearby ? <p style={{fontFamily:"Cabin", fontSize:24, color: (fontColor.get(minesNearby) || "black")}}>{minesNearby}</p> : null//minesNearby ? minesNearby : "";
    }

    const bgColorPicker = () => {
        if (isMouseHovering) {
            if (!isRevealed) {
                return '#62B958';
            }
        }
        if (!isRevealed) {
            return '#8FE186';
        }
        if (isMine) {
            return '#D33F49';
        }
        return '#EFD8A3'
    }

    const bgColor = bgColorPicker();
    return (
        <button className="Tile" 
        onMouseEnter={() => setMouseHovering(true)} 
        onMouseLeave={() => setMouseHovering(false)} 
        onClick={onClick}
        disabled={isRevealed || props.gameStatus == GAME_STATUS.Win || props.gameStatus == GAME_STATUS.Lose} 
        style={{width: props.tileSize, height: props.tileSize, backgroundColor: bgColor}}>
            {tileText()}
        </button>
    )
}