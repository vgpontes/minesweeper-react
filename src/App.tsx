import MinesweeperGame from './components/MinesweeperGame';

function App() {
  window.addEventListener('DOMContentLoaded', function() {
    function adjustHeight() {
        var windowHeight = window.innerHeight;
        document.getElementById('main')!.style.height = windowHeight + 'px';
    }

    adjustHeight();

    window.addEventListener('resize', function() {
        adjustHeight();
    });
});
  
  return (
    <div id="main" style={{ height: "100vh", width:"100vw", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto"}}>
      <MinesweeperGame numMines={10} boardHeight={9} boardWidth={9}/>
    </div>
  );
}

export default App;
