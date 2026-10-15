import { useState, useEffect } from "react"
import Card from "./components/Card"
import GameHeader from "./components/GameHeader"

const emojis = ["🍎", "🥝", "🍓", "🍉", "🍒", "🍇", "🥑", "🍌"]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createCards() {
  return shuffle([...emojis, ...emojis]).map((value, id) => ({
    id,
    value,
    isFlipped: false,
    isMatched: false,
  }))
}

function App() {
  const [cards, setCards] = useState(createCards)
  const [flippedIds, setFlippedIds] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [isWon, setIsWon] = useState(false)

  useEffect(() => {
    if (score === emojis.length) {
      setIsWon(true)
      const timer = setTimeout(() => {
        setCards(createCards())
        setFlippedIds([])
        setScore(0)
        setMoves(0)
        setIsLocked(false)
        setIsWon(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [score])

  function handleCardClick(id) {
    if (isLocked || isWon) return
    const clickedCard = cards.find((c) => c.id === id)
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return
    if (flippedIds.includes(id)) return

    const newFlippedIds = [...flippedIds, id]
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    )
    setFlippedIds(newFlippedIds)

    if (newFlippedIds.length === 2) {
      setMoves((m) => m + 1)
      setIsLocked(true)

      const firstCard = cards.find((c) => c.id === newFlippedIds[0])

      if (firstCard.value === clickedCard.value) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlippedIds.includes(c.id)
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          )
          setScore((s) => s + 1)
          setFlippedIds([])
          setIsLocked(false)
        }, 500)
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          )
          setFlippedIds([])
          setIsLocked(false)
        }, 1000)
      }
    }
  }

  function handleRestart() {
    setCards(createCards())
    setFlippedIds([])
    setScore(0)
    setMoves(0)
    setIsLocked(false)
    setIsWon(false)
  }

  return (
    <>
      {/* Win overlay */}
      {isWon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center win-animate">
            <p className="text-8xl mb-4">🎉</p>
            <p className="text-white text-4xl font-bold mb-2">You Won!</p>
            <p className="text-slate-400 text-lg">Finished in {moves} moves</p>
          </div>
        </div>
      )}

      {/* Container واحد بيضبط العرض لكل من الـ header والـ grid */}
      <div className="min-h-screen flex flex-col items-center py-6 px-4">
        <div className="w-full max-w-lg flex flex-col gap-4">
          <GameHeader score={score} moves={moves} onRestart={handleRestart} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card.value}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App