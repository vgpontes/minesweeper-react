import "./Minesweeper.css"

export interface TileProps {
    minesNearby : number,
    rowIndex: number,
    colIndex: number,
    tileSize: number
}

export function Tile(props:TileProps) {
    const onClick = () => {
        console.log(`Clicked ${props.rowIndex}-${props.colIndex}`)
    }
    return (
        <button className="Tile" onClick={onClick} style={{ width: props.tileSize, height: props.tileSize }}>
            {props.minesNearby}
        </button>
    )
}