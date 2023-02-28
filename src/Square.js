
function Square({onClick,val,hasWon,hint}) {//destructured the incomming props 
    return (
      <div
        onClick={onClick}
        className={`square flex select-none justify-center items-center text-white text-3xl w-24 h-24 bg-[#181a1b] m-1 rounded-lg
         ${!val&&!hasWon &&`hover:shadow hover:shadow-slate-300 hover:${hint}`}`}
       >
        {val}
      </div>
    );
  }
export default Square;
