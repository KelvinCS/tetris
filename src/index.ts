// const pieces = require("./pieces.json")

import {TetrisPiece} from "./tetris-piece";
import {Tetris} from "./tetris";
const gameHeight = 40
const gameWidth = 20

const gameContainer = document.getElementById("game")

const game = new Tetris({
  gameContainer
})
game.start()

// const hasCollision = (piece: TetrisPiece, nextPosition: { x: number,  }) => {
//   const hasExceededBorders = (x: number, y: number) =>  {
//     return (piece.position.x + x) >= gameWidth   ||
//            (piece.position.y + y) >= gameHeight  ||
//            (x) < 0
//   }
//
//   return piece.some((row) => row.some((part) => {
//     if (!part) return false;
//     if (hasExceededBorders(part) || gameState[part.y + position.y][part.x + position.x]) return true;
//   }))
// }

// type TTetrisPiece = Array<{x: number, y: number} | null>[]


// type TPosition = {
//   x: number;
//   y: number;
// }

// // type TDirection = 'down' | 'left' | 'right'
// type TTetrisPieceWithElement = TTetrisPiece & {
//   element?: HTMLElement
// }
//
// let currentPiece: TTetrisPiece = pieces.t
// let currentPiecePosition = { x: 0, y: 0 }
//
// const gameState = new Array(gameHeight)
//   .fill(null)
//   .map(() => new Array(gameWidth).fill(null))
//
//
// // [ 1 2 3 ]       [ 7 4 1 ]
// // [ 4 5 6 ] --->  [ 8 5 2 ]
// // [ 7 8 9 ]       [ 9 6 3 ]
//
// const rotatePieceMatrix = (piece: TTetrisPiece) => {
//   const reversedMatrix = [...piece].reverse()
//   const result: TTetrisPiece = []
//
//   for (let rowIndex in reversedMatrix) {
//     const row = reversedMatrix[rowIndex]
//
//     row.forEach((value, y) => {
//       if (!result[y]) result[y] = []
//       if (!value) result[y][rowIndex] = null
//       if (value) result[y][rowIndex] = { x: Number(rowIndex), y }
//     })
//   }
//
//   return result
// }
//
// const drawPiece = (piece: TTetrisPiece) => {
//   piece.forEach((row) => {
//     row.forEach((part) => {
//       if (!part) return;
//       const {x, y} = part;
//
//       const piecePart = document.createElement("div")
//       piecePart.classList.add('tetris-piece__part tetris-piece__part--current')
//       piecePart.style.transform = `translate(calc(20px * ${x + currentPiecePosition.x}), calc(20px * ${y + currentPiecePosition.y}))`
//
//       gameContainer.appendChild(piecePart)
//     })
//   })
// }
//
// const getRandomPiece = () => {
//   const piecesList: TTetrisPiece[] = Object.values(pieces)
//   return piecesList[Math.floor(Math.random() * piecesList.length)]
// }
//
// const hasCollision = (piece: TTetrisPiece, position: { x: number, y: number }) => {
//   const hasExceededBorders = (part: TPosition) =>  {
//     return (position.x + part.x) >= gameWidth   ||
//            (position.y + part.y) >= gameHeight  ||
//            (position.x) < 0
//   }
//
//   return piece.some((row) => row.some((part) => {
//     if (!part) return false;
//     if (hasExceededBorders(part) || gameState[part.y + position.y][part.x + position.x]) return true;
//   }))
// }
//
// const saveElementToState = () => {
//   gameState.forEach((row) => {
//     row.forEach(({ x, y }) => )
//   })
// }
//
//
// const getNextPosition = (position: TPosition, direction: TDirection) => {
//   if (direction === 'down') return { ...position, y: position.y + 1 }
//   if (direction === 'left') return { ...position, x: position.x - 1 }
//   if (direction === 'right') return { ...position, x: position.x + 1 }
// }
//
// const moveCurrentPiece = (direction: TDirection) => {
//   currentPiecePosition = getNextPosition(currentPiecePosition, direction)
// }
//
// const removeCurrentPiece = () => {
//   const pieceParts = document.querySelectorAll('.tetris-piece__part--current')
// }
//
// const clearBoard = (container: any) => {
//   gameContainer.innerHTML = ''
// }
//
//
// drawPiece(currentPiece)
//
// setInterval(() => {
//   // if (hasCollision())
//   const nextPosition = getNextPosition(currentPiecePosition, 'down')
//
//   if (hasCollision(currentPiece, nextPosition)) {
//     currentPiece = getRandomPiece()
//     currentPiecePosition = { x: 0, y: 0 }
//   } else {
//     moveCurrentPiece('down')
//     console.log(currentPiecePosition)
//   }
//   clearBoard(gameContainer)
//   drawPiece(currentPiece)
// }, 100)
//
// document.addEventListener('keydown', ({key}) => {
//   if (key === 'ArrowUp') {
//     clearBoard(gameContainer)
//     currentPiece = rotatePieceMatrix(currentPiece)
//     console.log(currentPiece)
//     drawPiece(currentPiece)
//   }
// })

