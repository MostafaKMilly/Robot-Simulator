import { IRobot } from "./interfaces/robot.interface";
import { Direction } from "./types/direction.type";

export class Robot implements IRobot {
  x: number | null = null;
  y: number | null = null;
  direction: Direction | null = null;

  isPlaced(): this is { x: number; y: number; direction: Direction } {
    return this.x !== null && this.y !== null && this.direction !== null;
  }

  place(x: number, y: number, direction: Direction): void {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  changePosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  changeDirection(direction: Direction): void {
    this.direction = direction;
  }

  output() {
    console.log(`Output: ${this.x},${this.y},${this.direction}`);
  }
}
