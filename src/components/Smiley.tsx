import { GAME_STATUS } from "./MinesweeperGame";
import { FaFaceSmile, FaFaceDizzy,FaFaceGrinBeam, FaFaceFlushed } from "react-icons/fa6";

export function Smiley(props : {gameStatus: GAME_STATUS, hold: boolean}) {
    const smileyFace = () => {
        if (props.gameStatus == GAME_STATUS.Win) {
            return <FaFaceGrinBeam style={{borderRadius: "50%", border: "1px solid black", height: "100%", width: "100%"}} color="yellow"/>;
        } else if (props.gameStatus == GAME_STATUS.Lose) {
            return <FaFaceDizzy style={{borderRadius: "50%", border: "1px solid black", height: "100%", width: "100%"}} color="yellow"/>;
        } else if (props.hold) {
            return <FaFaceFlushed style={{borderRadius: "50%", border: "1px solid black", height: "100%", width: "100%"}} color="yellow"/>;
        }
        else {
            return <FaFaceSmile style={{borderRadius: "50%", border: "1px solid black", height: "100%", width: "100%"}} color="yellow"/>
        }
    }
    return (
        <div id="smiley" style={{
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: "none",
            backgroundColor: "lightgrey",
            marginBottom: 10,
            padding: 20,
            border: "1px solid black"
            }}>
            <span style={{
                height: "30px",
                width: "30px",
                backgroundColor: "black",
                borderRadius: "50%",
                display: "inline-block"
                }}>
                {smileyFace()}
            </span>
        </div>
        
    );
}