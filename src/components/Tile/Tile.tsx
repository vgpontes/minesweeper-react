import { useState } from "react";
import { TileInfo } from "../../utils/Minesweeper"
import { GAME_STATUS } from "../MinesweeperGame/MinesweeperGame";
import { LongPressEventType, useLongPress } from "use-long-press";
import { PiFlagPennantFill } from "react-icons/pi";

export interface TileProps {
    tileInfo : TileInfo,
    rowIndex: number,
    colIndex: number,
    gameStatus: GAME_STATUS
    onClick: (i:number, j:number) => void
    onRightClick: (i:number, j:number) => void
    onHold: () => void;
}

export default function Tile(props:TileProps) {
    const [isMouseHovering, setMouseHovering] = useState(false);
    const [isMousePressed, setMousePressed] = useState(false);
    const {minesNearby, isFlagged, isRevealed, isMine} = props.tileInfo;
    
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (e.button == 0) {
            props.onClick(props.rowIndex, props.colIndex);
        } else if (e.button == 2) {
            props.onRightClick(props.rowIndex, props.colIndex);
        }
        setMousePressed(false);
    }

    const tileText = () => {
        if (isFlagged) {
            return <PiFlagPennantFill color="red"/>
        }
        if (!isRevealed) {
            return null;
        }
        if (isMine) {
            return <p style={{userSelect:"none"}}>{"\u{1F4A3}"}</p>;
        }
        const fontColor = new Map([[1, "blue"], [2, "green"], [3, "red"], [4, "purple"]]);
        return minesNearby ? <p style={{userSelect: "none", fontFamily:"Cabin", fontSize:24, color: (fontColor.get(minesNearby) || "black")}}>{minesNearby}</p> : null//minesNearby ? minesNearby : "";
    }

    const bgColorPicker = () => {
        if (isMousePressed) {
            props.onHold();
            return '#428A3A'
        }
        if (isMouseHovering) {
            if (!isRevealed) {
                return '#62B958'; // color of grass when mouse is over tile
            }
        }
        if (!isRevealed) {
            return '#8FE186'; // color of grass
        }
        if (isMine) {
            return '#D33F49'; // Red Mine color
        }
        return '#EFD8A3' // Dirt color
    }

    const longPress = useLongPress(() => {
        if (!isRevealed && props.gameStatus == GAME_STATUS.InProgress) {
            props.onRightClick(props.rowIndex, props.colIndex);
        };
    }, {
        filterEvents: () => true,
        detect: LongPressEventType.Touch
    });

    const bgColor = bgColorPicker();
    return (
        <button className="Tile"
        onContextMenu={(e)=> e.preventDefault()}
        onMouseEnter={() => setMouseHovering(true)} 
        onMouseLeave={() => {setMouseHovering(false); setMousePressed(false)}}
        onMouseDown={() => setMousePressed(true)}
        onMouseUp={onClick}
        {...longPress()}
        disabled={isRevealed || props.gameStatus == GAME_STATUS.Win || props.gameStatus == GAME_STATUS.Lose} 
        style={{backgroundColor: bgColor}}>
            {tileText()}
        </button>
    )
}