import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}



const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({onClick,val}) {//destructured the incomming props 
  return (
    <div
      onClick={onClick}
      className="square"
      style={squareStyle}>
      {val}
    </div>
  );
}

function Board() {
  let a=Array(9).fill("");
  const [state,setState]=useState(a);
  const [isPlayerA,setIsPlayerA]=useState(true);

  const clickHandler=index=>{
      if(state[index] || hasWon) return;// return if already won & already filled
      let boardState=[...state];
      boardState[index]= isPlayerA?'X':'O';
      setState(boardState);
      setIsPlayerA((prev)=>!prev)
  }
  const resetHandler=()=>{
    setState(a);
    setIsPlayerA(true);// resets the game as brand new
  }
  const winnerHandler=()=>{
      let winningPattern=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];

      for(let pattern of winningPattern){
        const [a,b,c]=pattern;// destructuring here
        if(state[a]&&state[b]===state[a]&&state[a]===state[c])
        return state[a];
      }
      return false;
  }

  const hasWon=winnerHandler();

  return (
    <div style={containerStyle} className="gameBoard">
      {!hasWon && <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{isPlayerA?"X":"O"}</span></div>}
      {hasWon && <div id="winnerArea" className="winner" style={instructionsStyle}>
      Winner: <span>{`${hasWon} won`}</span>
      </div>}
      <button onClick={()=>resetHandler()} style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square onClick={()=>clickHandler(0)} val={state[0]} />
          <Square onClick={()=>clickHandler(1)} val={state[1]} />
          <Square onClick={()=>clickHandler(2)} val={state[2]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={()=>clickHandler(3)} val={state[3]} />
          <Square onClick={()=>clickHandler(4)} val={state[4]} />
          <Square onClick={()=>clickHandler(5)} val={state[5]} />
          
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={()=>clickHandler(6)} val={state[6]} />
          <Square onClick={()=>clickHandler(7)} val={state[7]} />
          <Square onClick={()=>clickHandler(8)} val={state[8]} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);