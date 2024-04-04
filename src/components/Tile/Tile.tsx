import { useState } from "react";
import { TileInfo } from "../../utils/Minesweeper"
import { GAME_STATUS } from "../MinesweeperGame/MinesweeperGame";
import { PiFlagPennantFill } from "react-icons/pi";
import { LongPressEventType, useLongPress } from "use-long-press"
import "./Tile.css"

export interface TileProps {
    tileInfo : TileInfo,
    rowIndex: number,
    colIndex: number,
    gameStatus: GAME_STATUS
    onClick: (i:number, j:number) => void
    onRightClick: (i:number, j:number) => void
    setIsHold: React.Dispatch<React.SetStateAction<boolean>>;
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0))
  }

export default function Tile(props:TileProps) {
    const [isMouseHovering, setMouseHovering] = useState(false);
    const [isMousePressed, setMousePressed] = useState(false);
    const [isUnflagging, setIsUnflagging] = useState(false)
    const {minesNearby, isFlagged, isRevealed, isMine} = props.tileInfo;
    
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!isUnflagging) {
            props.onClick(props.rowIndex, props.colIndex);
        } else {
            setIsUnflagging(false)
        }
    }
    

    const onRightClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // make it so only mouse right click
        if (e.button === 2) {
            props.onRightClick(props.rowIndex, props.colIndex);
            setMousePressed(false);
        }
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
        return minesNearby ? <p className="TileText" style={{userSelect: "none", fontFamily:"Cabin", color: (fontColor.get(minesNearby) || "black")}}>{minesNearby}</p> : null//minesNearby ? minesNearby : "";
    }

    const bgColorPicker = () => {
        if (isMousePressed) {
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

    const bgColor = bgColorPicker();

    const onTouchHold = useLongPress(() => {
        if (!isRevealed && props.gameStatus == GAME_STATUS.InProgress) {
            props.onRightClick(props.rowIndex, props.colIndex);
        };
    }, {
        onStart: () => {setMousePressed(true); props.setIsHold(true)},
        onCancel: () => {
            if (!isRevealed && props.gameStatus == GAME_STATUS.InProgress) {
                props.onClick(props.rowIndex, props.colIndex);
            };
            setMousePressed(false);
            props.setIsHold(false)},
        onFinish: () => {
            if (isFlagged) {
                setIsUnflagging(false);
            } else {
                setIsUnflagging(true);
            }
            setMousePressed(false); 
            props.setIsHold(false)},
        filterEvents: () => true,
        detect: LongPressEventType.Touch
    });

    return (
        <button className="Tile"
        onMouseEnter={() => {if (!isTouchDevice()) setMouseHovering(true)}} 
        onMouseLeave={() => {setMouseHovering(false); setMousePressed(false)}}
        onMouseDown={() => {setMousePressed(true); props.setIsHold(true)}}
        onMouseUp={() => {setMousePressed(false); props.setIsHold(false)}}
        onClick={onClick}
        onContextMenu={onRightClick}
        {...onTouchHold()}
        disabled={isRevealed || props.gameStatus == GAME_STATUS.Win || props.gameStatus == GAME_STATUS.Lose} 
        style={{backgroundColor: bgColor}}>
            {tileText()}
        </button>
    )
}