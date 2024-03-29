import React from 'react';
import MinesweeperGame from './components/MinesweeperGame';

function App() {
  return (
    <MinesweeperGame numMines={10} boardHeight={9} boardWidth={9}/>
  );
}

export default App;
