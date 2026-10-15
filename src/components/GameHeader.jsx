/* الـ header دلوقتي جوه container بـ max-w-lg في App — مش محتاج max-w خاص بيه */
function GameHeader({ score, moves, onRestart }) {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 px-8 text-center">
      <h1 className="font-orbitron font-bold text-2xl text-white tracking-widest mb-4">
        Rack Your Brain!
      </h1>

      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center gap-1">
          <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
            Score
          </span>
          <span className="text-white text-2xl font-bold">{score}</span>
        </div>

        <div className="w-px h-8 bg-slate-700" />

        <div className="flex flex-col items-center gap-1">
          <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
            Moves
          </span>
          <span className="text-white text-2xl font-bold">{moves}</span>
        </div>

        <div className="w-px h-8 bg-slate-700" />

        <button
          id="restart-btn"
          onClick={onRestart}
          title="Restart Game"
          className="flex flex-col items-center gap-1 group"
        >
          <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase group-hover:text-slate-200 transition-colors duration-200">
            Restart
          </span>
          <span className="text-white text-2xl group-hover:rotate-180 transition-transform duration-500">
            🔄
          </span>
        </button>
      </div>
    </div>
  );
}

export default GameHeader;
