import { useEffect, useState } from 'react';
import MinesweeperGame from './components/MinesweeperGame';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate dimensions based on window size
  const calculateDimensions = () => {
    // You can adjust this logic according to your requirements
    let height = windowSize.height * 0.8; // 60% of window height

    return height;
  };

  const height = calculateDimensions();

  return (
    <div style={{height}}>
      <MinesweeperGame numMines={10} boardHeight={9} boardWidth={9}/>
    </div>
  );
}

export default App;
