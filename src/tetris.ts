import {TetrisPiece} from "./tetris-piece";
import {TDirection, TPosition} from "./utils";

type TTetrisParams = {
  gameHeight?: number;
  gameWidth?: number;
  gameContainer: HTMLElement
}

export class Tetris {
  constructor({
    gameHeight = 40,
    gameWidth = 20,
    gameContainer,
  }: TTetrisParams) {
    this.gameHeight = gameHeight
    this.gameWidth = gameWidth
    this.gameContainer = gameContainer
    this.gameState = this.getInitialGameState()
  }

  private gameContainer: HTMLElement
  private gameHeight: number
  private gameWidth: number
  private gameSpeed: number = 400
  private gameState: (HTMLElement | null)[][];
  private currentPiece: TetrisPiece;

  private getInitialGameState() {
    return new Array(this.gameHeight)
      .fill(null)
      .map(() => new Array(this.gameWidth).fill(null))
  }

  private hasCollision(piece: TetrisPiece, nextPosition: TPosition) {
    const hasExceededBorders = ({x, y}: TPosition) => {
      return x >= this.gameWidth ||
            y >= this.gameHeight ||
            x < 0
    }

    return piece.pieceMapping.some((rows, y) =>
      rows.some((element, x) => {
        if (!element) return false;
        const elementX = x + nextPosition.x
        const elementY = y + nextPosition.y

        return hasExceededBorders({x: elementX, y: elementY}) ||
          !!this.gameState[elementY][elementX]
      })
    )

  }

  saveCurrentPieceToGameState() {
    this.currentPiece
      .pieceMapping
      .forEach((rows, y) =>
        rows.forEach((element, x) =>
          this.gameState[y + this.currentPiece.position.y][x + this.currentPiece.position.x] = element))
  }

  addEventListeners() {
    document.addEventListener('keydown', ({key}) => {
      let nextPosition: TPosition;
      let direction: TDirection;

      if (key === 'ArrowRight') {
        nextPosition = this.currentPiece.getNextPosition('right')
        direction = 'right'
      } else if (key === 'ArrowLeft') {
        nextPosition = this.currentPiece.getNextPosition('left')
        direction = 'left'
      } else if (key === 'ArrowUp') {
        this.currentPiece.rotate90Deg()
      }

      if (nextPosition && !this.hasCollision(this.currentPiece, nextPosition)) {
        this.currentPiece.move(direction)
      }

    })
  }

  start() {

    this.addEventListeners()
    this.currentPiece = new TetrisPiece({})
    this.currentPiece.appendTo(this.gameContainer)

    setInterval(() => {
      const nextPosition = this.currentPiece.getNextPosition('down')
      if (!this.hasCollision(this.currentPiece, nextPosition)) {
        this.currentPiece.move('down')
      } else {
        this.saveCurrentPieceToGameState()
        this.currentPiece = new TetrisPiece({})
        this.currentPiece.appendTo(this.gameContainer)
      }
    }, this.gameSpeed)
  }
}