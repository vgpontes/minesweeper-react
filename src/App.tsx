import React from 'react';
import MinesweeperGame from './components/MinesweeperGame';

function App() {
  
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <MinesweeperGame numMines={0} boardHeight={5} boardWidth={3}/>
    </div>
  );
}

export default App;
