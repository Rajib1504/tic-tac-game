import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Player = 'X' | 'O'
type CellValue = Player | null

type WinningLine = [number, number, number]

const WINNING_LINES: WinningLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(board: CellValue[]): Player | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function findCriticalMove(board: CellValue[], player: Player): number | null {
  for (const [a, b, c] of WINNING_LINES) {
    const line = [board[a], board[b], board[c]]
    const playerCount = line.filter((value) => value === player).length
    const emptyCount = line.filter((value) => value === null).length

    if (playerCount === 2 && emptyCount === 1) {
      if (board[a] === null) return a
      if (board[b] === null) return b
      if (board[c] === null) return c
    }
  }
  return null
}

function getComputerMove(board: CellValue[]): number | null {
  const winningMove = findCriticalMove(board, 'O')
  if (winningMove !== null) return winningMove

  const blockingMove = findCriticalMove(board, 'X')
  if (blockingMove !== null) return blockingMove

  if (board[4] === null) return 4

  const corners = [0, 2, 6, 8]
  for (const index of corners) {
    if (board[index] === null) return index
  }

  for (let index = 0; index < board.length; index += 1) {
    if (board[index] === null) return index
  }

  return null
}

function App() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X') // user is X

  const winner = useMemo(() => calculateWinner(board), [board])
  const isDraw = useMemo(
    () => !winner && board.every((cell) => cell !== null),
    [board, winner],
  )
  const isGameOver = winner !== null || isDraw
  const isComputerTurn = currentPlayer === 'O' && !isGameOver

  const statusText = winner
    ? winner === 'X'
      ? 'You win!'
      : 'Computer wins!'
    : isDraw
      ? "It's a draw!"
      : currentPlayer === 'X'
        ? 'Your turn (X)'
        : 'Computer is thinking...'
  const statusClassName = winner
    ? 'status-win'
    : isDraw
      ? 'status-draw'
      : isComputerTurn
        ? 'status-thinking'
        : 'status-turn'

  useEffect(() => {
    if (!isComputerTurn) {
      return
    }

    const timeoutId = setTimeout(() => {
      setBoard((prevBoard) => {
        const move = getComputerMove(prevBoard)
        if (move === null || prevBoard[move] !== null) {
          return prevBoard
        }

        const nextBoard = [...prevBoard]
        nextBoard[move] = 'O'
        return nextBoard
      })
      setCurrentPlayer('X')
    }, 350)

    return () => clearTimeout(timeoutId)
  }, [isComputerTurn])

  const handleSquareClick = (index: number) => {
    if (board[index] || isGameOver || currentPlayer !== 'X') {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = 'X'
    setBoard(nextBoard)
    setCurrentPlayer('O')
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
  }

  return (
    <main className="game-page">
      <section className="game-card" aria-label="Tic Tac Toe Game">
        <h1>Tic Tac Toe</h1>

        <p
          className={`status ${statusClassName}`}
          aria-live="polite"
        >
          {statusText}
        </p>

        <div className="board" role="grid" aria-label="3 by 3 game board">
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              role="gridcell"
              className={`square ${cell === 'X' ? 'square-x' : ''} ${cell === 'O' ? 'square-o' : ''}`}
              onClick={() => handleSquareClick(index)}
              disabled={Boolean(cell) || isGameOver || isComputerTurn}
              aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ''}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <button type="button" className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </section>
    </main>
  )
}

export default App
