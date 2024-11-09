import { Direction } from "../types/direction.type";

export interface IRobot {
  x: number | null;
  y: number | null;
  direction: Direction | null;

  isPlaced(): boolean;
  place(x: number, y: number, direction: Direction): void;
  changePosition(x: number, y: number): void;
  changeDirection(direction: Direction): void;
  output(): void;
}
