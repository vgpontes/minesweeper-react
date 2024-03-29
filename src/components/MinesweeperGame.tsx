import { Minesweeper, MinesweeperProps } from "../utils/Minesweeper"
import { Tile } from "./Tile"

export default function MinesweeperGame(props:MinesweeperProps) {
    const game = new Minesweeper(props)
    return (
        <Tile/>
    )
}