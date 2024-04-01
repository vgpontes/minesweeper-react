import { IoFlagSharp } from "react-icons/io5"

export interface FlagBoxProps {
    numFlags: number
}

export function FlagBox(props : FlagBoxProps) {
    return (
        <div id="flagbox" style={{
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            backgroundColor: "#8FE186",
            padding: 20,
            gap: 25,
            marginBottom: 10,
            display: "flex",
            border: "1px solid black"
            }}>
            <IoFlagSharp color="red"/>
            <p style={{fontFamily: "Cabin"}}>{props.numFlags}</p>
        </div>
    )
}