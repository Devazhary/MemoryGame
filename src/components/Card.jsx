// ✅ Fix: استبدلنا w-full h-full بـ aspect-square عشان الكارت يبقى مربع من غير ما يعتمد على h-full من الـ parent
function Card({ card, isFlipped, isMatched, onClick }) {
  const showFlipped = isFlipped || isMatched;

  return (
    <div className="aspect-square card-flip cursor-pointer" onClick={onClick}>
      <div className={`card-inner ${showFlipped ? "flipped" : ""}`}>

        {/* Front face */}
        <div className="card-face bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-slate-400 transition-colors duration-200 text-3xl">
          &#x2753;
        </div>

        {/* Back face */}
        <div className={`card-face text-4xl ${
          isMatched
            ? "bg-slate-700 border-2 border-emerald-500"
            : "bg-slate-800 border border-slate-500"
        }`}>
          {card}
        </div>

      </div>
    </div>
  );
}

export default Card;
