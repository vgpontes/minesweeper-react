import { useCallback, useState } from "react";
import { TileInfo } from "../utils/Minesweeper"
import "./Minesweeper.css"
import { GAME_STATUS } from "./MinesweeperGame";
import { LongPressEventType, LongPressReactEvents, useLongPress } from "use-long-press";

export interface TileProps {
    tileInfo : TileInfo,
    rowIndex: number,
    colIndex: number,
    tileSize: number,
    gameStatus: GAME_STATUS
    onClick: (i:number, j:number) => void
    onRightClick: (i:number, j:number) => void
}

export function Tile(props:TileProps) {
    const [isMouseHovering, setMouseHovering] = useState(false);
    const {minesNearby, isFlagged, isRevealed, isMine} = props.tileInfo;
    const [isDisabled, setDisabled] = useState(false);
    
    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (e.button == 0) {
            props.onClick(props.rowIndex, props.colIndex);
        } else if (e.button == 2) {
            props.onRightClick(props.rowIndex, props.colIndex);
        }
    }

    const tileText = () => {
        if (isFlagged) {
            //return <MaterialCommunityIcons name="flag-variant" color="red" size={24}/>
            return <p style={{userSelect:"none"}}>{"\u{1F6A9}"}</p>;
        }
        if (!isRevealed) {
            return null;
        }
        if (isMine) {
            //return <MaterialCommunityIcons name="bomb" size={24} color="black" />
            return <p style={{userSelect:"none"}}>{"\u{1F4A3}"}</p>;
        }
        const fontColor = new Map([[1, "blue"], [2, "green"], [3, "red"], [4, "purple"]]);
        return minesNearby ? <p style={{userSelect: "none", fontFamily:"Cabin", fontSize:24, color: (fontColor.get(minesNearby) || "black")}}>{minesNearby}</p> : null//minesNearby ? minesNearby : "";
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

    const longPress = useLongPress(() => {
        if (!isRevealed && props.gameStatus == GAME_STATUS.InProgress) props.onRightClick(props.rowIndex, props.colIndex);
    }, {
        filterEvents: () => true,
        detect: LongPressEventType.Touch
    });

    const bgColor = bgColorPicker();
    return (
        <button className="Tile"
        onContextMenu={(e)=> e.preventDefault()}
        onMouseEnter={() => setMouseHovering(true)} 
        onMouseLeave={() => setMouseHovering(false)} 
        onMouseUp={onMouseDown}
        {...longPress()}
        disabled={isRevealed || props.gameStatus == GAME_STATUS.Win || props.gameStatus == GAME_STATUS.Lose} 
        style={{width: props.tileSize, height: props.tileSize, backgroundColor: bgColor}}>
            {tileText()}
        </button>
    )
}