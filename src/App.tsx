import React from "react";
import { MinesweeperGame } from "./components";

function App() { 
  return (
    <div style={{width: "500px", height: "500px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red", padding: 200}}>
      <MinesweeperGame numMines={10} boardHeight={15} boardWidth={9}/>
    </div>
  );
}

export default App;
