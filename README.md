
# Minesweeper-React

Minesweeper-React is my personal Minesweeper game component built using Typescript and React

Check it out at (https://main.d18z4gghbwx51h.amplifyapp.com/).

## Import it into your React project

1. Run `npm i @vgpontes/minesweeper-react`

2. Import into your project using `import { MinesweeperGame } from '@vgpontes/minesweeper-react'

## Sample Code

```
import { MinesweeperGame } from '@vgpontes/minesweeper-react'

function  App() {
	return (
	<div style={{
		width:  "100vw", 
		height:  "100vh", 
		display:  "flex", 
		alignItems:  "center", 
		justifyContent:  "center"
		}}>
		<MinesweeperGame  numMines={10}  boardHeight={9}  boardWidth={9}/>
	</div>

	);
}

export  default  App;
```

## License

[MIT](https://choosealicense.com/licenses/mit/)