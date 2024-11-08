import { BaseCommand } from "./baseCommand";
import { Table } from "../table";
import { Direction } from "../types/direction.type";
import { Robot } from "../robot";

export class PlaceCommand extends BaseCommand {
  private x: number;
  private y: number;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    super();
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  execute(robot: Robot, table: Table): void {
    if (table.isValidPosition(this.x, this.y)) {
      robot.place(this.x, this.y, this.direction);
    } else {
      console.error("Invalid PLACE command: Position is out of bounds.");
    }
  }
}
