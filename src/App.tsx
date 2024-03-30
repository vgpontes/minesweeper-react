import React from 'react';
import MinesweeperGame from './components/MinesweeperGame';

function App() {
  return (
    <MinesweeperGame numMines={0} boardHeight={1} boardWidth={1}/>
  );
}

export default App;
