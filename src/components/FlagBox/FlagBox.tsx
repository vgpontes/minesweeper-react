import { PiFlagPennantFill } from "react-icons/pi";

export interface FlagBoxProps {
    numFlags: number
}

export default function FlagBox(props : FlagBoxProps) {
    return (
        <div id="flagbox" style={{
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            backgroundColor: "#8FE186",
            paddingLeft: 5,
            paddingRight: 5,
            gap: 10,
            display: "flex",
            border: "1px solid black"
            }}>
            <PiFlagPennantFill color="red"/>
            <p style={{fontFamily: "Cabin", color: "black"}}>{props.numFlags}</p>
        </div>
    )
}