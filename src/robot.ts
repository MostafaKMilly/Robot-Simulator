import { Direction } from "readline";

export class Robot {
  x: number | null = null;
  y: number | null = null;
  direction: Direction | null = null;

  isPlaced(): boolean {
    return this.x !== null && this.y !== null && this.direction !== null;
  }
}
