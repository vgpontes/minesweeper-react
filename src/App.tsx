import MinesweeperGame from './components/MinesweeperGame';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <MinesweeperGame numMines={10} boardHeight={9} boardWidth={9}/>
    </div>
  );
}

export default App;
