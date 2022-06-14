const pieces = require('./pieces.json')

type TPosition = {
  x: number;
  y: number;
}

type TDirection = 'down' | 'right' | 'left'

type TTetrisPiece = {
  parts: Array<{x: number, y: number} | null>[]
  color: string;
}
type TPieceMapping = (HTMLDivElement | null)[][];

const getRandomPiece = (): string => {
  const piecesList: string[] = Object.keys(pieces)
  return piecesList[Math.floor(Math.random() * piecesList.length)]
}

type TTetrisPieceParams = {
  type?: keyof typeof pieces;
  position?: TPosition;
  partSize?: number;
}

export class TetrisPiece {
  constructor({
    position = { x: 8, y: 0 },
    partSize = 20,
    type = getRandomPiece(),
  }: TTetrisPieceParams) {
    this.type = type;
    this.position = position;
    this.partSize = partSize;
    this.pieceMapping = this.getPieceMapping()
  }

  private readonly gameHeight: number;
  private readonly gameWidth: number;
  private readonly partSize: number;
  public readonly type: keyof typeof pieces;
  public position: TPosition;
  public pieceMapping: TPieceMapping;

  private getPartTranslation({ x, y }: TPosition) {
    return `translate(calc(${x} * ${this.partSize}px), calc(${y} * ${this.partSize}px))`
  }

  private setPartTranslation(part: HTMLDivElement, {x, y}: TPosition) {
    part.style.transform = this.getPartTranslation({
      x: x + this.position.x,
      y: y + this.position.y,
    })
  }

  private getPieceMapping() {
    const piece: TTetrisPiece = pieces[this.type]

    return piece.parts.map((rows) =>
        rows.map((part) => {
          if (!part) return null;

          const element = document.createElement('div')
          element.classList.add('tetris-piece__part')
          element.style.background = piece.color;
          this.setPartTranslation(element, {x: part.x, y: part.y})
          return element
        }))
  }

  public appendTo(container: HTMLElement) {
    this.pieceMapping
      .forEach((rows) => rows.forEach((part) => {
        if (part) container.appendChild(part)
      }))
  }

  public rotate90Deg() {
    const reversedMatrix = [...this.pieceMapping].reverse()
    const parts: HTMLDivElement[][] = []

    for (let y in reversedMatrix) {
      const row = reversedMatrix[y]

      for (let x in row) {
        if (!parts[x]) parts[x] = []
        const part = reversedMatrix[y][x]

        if (!part) {
          parts[x][y] = null
          continue;
        }

        parts[x][y] = part

        this.setPartTranslation(part, {x: +y, y: +x})
      }
    }

    this.pieceMapping = parts;
  }

  private makeTransition() {
    this.pieceMapping.forEach((rows, y) =>
      rows.forEach((part, x) => part && this.setPartTranslation(part, {x, y})))
  }

  public getNextPosition(direction: TDirection): TPosition {
    if (direction === 'down') return { ...this.position, y: this.position.y + 1 }
    if (direction === 'left') return { ...this.position, x: this.position.x - 1 }
    if (direction === 'right') return { ...this.position, x: this.position.x + 1 }
  }

  public move(direction: TDirection) {
    this.position = this.getNextPosition(direction)
    this.makeTransition()
  }
}