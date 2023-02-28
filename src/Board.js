import { useState } from "react";
import Square from "./Square";

function Board() {

    let a=Array(9).fill("");
    const [state,setState]=useState(a);
    const [isPlayerA,setIsPlayerA]=useState(true);
  
    const clickHandler=index=>{
        if(state[index] || hasWon) return;// return if already won & already filled
        let boardState=[...state];
        boardState[index]= isPlayerA?'❌':'⭕️';
        setState(boardState);
        setIsPlayerA((prev)=>!prev)
    }
    const resetHandler=()=>{
      setState(a);
      setIsPlayerA(true);// resets the game as brand new
    }
    const winnerHandler=()=>{
        console.log('got rendered')
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
    const hint=isPlayerA?"after:content-['✕']":"after:content-['◯'] ";
  
    return (
      <div className="gameBoard flex flex-col justify-center items-center select-none ">
       
        {!hasWon && <div id="statusArea" className="status text-gray-200 p-2 " >Next player: <span>{isPlayerA?'❌':'⭕️'}</span></div>}
        {hasWon && <div id="winnerArea" className="winner bg-pink-200 p-2 m-2 rounded-lg w-full text-center" >
        <span>{` ${hasWon} has won`}</span>
        </div>}
        
        <div className="bg-[#222426] flex flex-col justify-center w-fit p-1.5 rounded-lg">
          <div className="flex">
            {[0,1,2].map((ele)=>{
               return <Square hasWon={hasWon}  hint={hint} onClick={()=>clickHandler(ele)} val={state[ele]} />
            })}
          </div>
          <div className="flex">
            {[3,4,5].map((ele)=>{
               return <Square hasWon={hasWon}  hint={hint} onClick={()=>clickHandler(ele)} val={state[ele]} />
            })}
          </div>
          <div className="flex">
            {[6,7,8].map((ele)=>{
               return <Square hasWon={hasWon}  hint={hint} onClick={()=>clickHandler(ele)} val={state[ele]} />
            })}
          </div>
        </div>
        <button className="bg-green-500 w-fit h-fit p-2 rounded-lg m-2  hover:bg-green-300" onClick={()=>resetHandler()}>Reset</button>
      </div>
    );
  }

  export default Board;
  