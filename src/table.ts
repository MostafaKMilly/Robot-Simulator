export class Table {
  readonly width: number;
  readonly height: number;

  constructor(width = 5, height = 5) {
    this.width = width;
    this.height = height;
  }

  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}
