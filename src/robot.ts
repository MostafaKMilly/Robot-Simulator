import { Direction } from "./types/direction.type";

export class Robot {
  x: number | null = null;
  y: number | null = null;
  direction: Direction | null = null;

  isPlaced(): boolean {
    return this.x !== null && this.y !== null && this.direction !== null;
  }

  place(x: number, y: number, direction: Direction): void {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}
