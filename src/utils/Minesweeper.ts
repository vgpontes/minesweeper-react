export interface MinesweeperProps {
    boardWidth : number,
    boardHeight : number,
    numMines : number
}

export interface TileInfo {
    minesNearby : number,
    isMine : boolean
    isFlagged : boolean,
    isRevealed : boolean
}

export interface Coordinate {
    x : number,
    y : number
}

export class Minesweeper {
    readonly board : TileInfo[][];
    private mineCoordinates : Coordinate[];
    private numMines : number;

    constructor(props : MinesweeperProps) {
        this.board = new Array(props.boardWidth).fill(null).map(() => {
            return new Array(props.boardHeight).fill(null).map(() => ({
                minesNearby: 0,
                isMine: false,
                isFlagged: false,
                isRevealed: false
            }));
        });
        this.mineCoordinates = [];
        this.numMines = props.numMines;
    }

    printBoard() {
        var text = "";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                text += this.board[i][j].minesNearby + "\t";
            }
            text += "\n"
        }
        console.log(text + "\n\n\n\n\n")
    }

    placeMines(initialX : number, initialY : number) {
        var placedMines = 0;
        var coordinates : Coordinate[] = [];
        
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (isValidNeighbor(i, j, initialX, initialY)) continue;
                coordinates.push({x: i, y: j}); 
            }
        }
    
        while (coordinates.length > 0 && placedMines < this.numMines) {
            const randomCoordinate = coordinates[Math.floor(Math.random() * coordinates.length)];
            const x = randomCoordinate.x;
            const y = randomCoordinate.y;
            this.board[x][y].isMine = true;
            this.board[x][y].minesNearby = -1;
            this.mineCoordinates.push(randomCoordinate);
            this.calculateNeighbors(x, y);
            const index =  coordinates.indexOf(randomCoordinate);
            coordinates.splice(index, 1);
            placedMines++;
        }

        if (placedMines != this.numMines) {
            this.numMines = placedMines;
        }
    }

    getNumMines() {
        return this.numMines;
    }

    getMineCoordinates() {
        return this.mineCoordinates;
    }

    calculateNeighbors(i : number, j : number) {
        const positions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ]
    
        positions.forEach(([row, col]) =>{
            const newRow = i + row;
            const newCol = j + col;
    
            if (newRow >= 0 && newRow < this.board.length && newCol >= 0 && newCol < this.board[0].length) {
                if (this.board[newRow][newCol].isMine == false) 
                    this.board[newRow][newCol].minesNearby++;
            }
        })
    }

    revealTile(i: number, j : number, countObj?:any) {
        if (i < 0 || i >= this.board.length || j < 0 || j >= this.board[0].length || this.board[i][j].isRevealed || 
            this.board[i][j].isFlagged) return;
        this.board[i][j].isRevealed = true;
        if (countObj) {
            countObj.val++;
        }
        if (this.board[i][j].minesNearby === 0) {
            this.revealTile(i + 1, j, countObj);
            this.revealTile(i - 1, j, countObj);
            this.revealTile(i, j + 1, countObj);
            this.revealTile(i, j - 1, countObj);
            this.revealTile(i + 1, j - 1, countObj);
            this.revealTile(i - 1, j - 1, countObj);
            this.revealTile(i + 1, j + 1, countObj);
            this.revealTile(i - 1, j + 1, countObj);
        }
    }

    revealBomb(i: number, j : number) {
        this.board[i][j].isRevealed = true;
        this.board[i][j].isFlagged = false;
    }
}

function isValidNeighbor(x : number, y : number, initialX : number, initialY : number) {
    return (x == initialX && y == initialY) || (Math.abs(x - initialX) <= 1 && Math.abs(y - initialY) <= 1);
}