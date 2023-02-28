import Board from './Board';

function App() {
  return (
    <div className="game">
      <div className="game-board flex justify-center items-center  h-screen bg-[#2f3335]">
        <Board />
      </div>
    </div>
  );
}

export default App;
