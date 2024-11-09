import { BaseCommand } from "./baseCommand";
import { Table } from "../table";
import { Direction } from "../types/direction.type";
import { Robot } from "../robot";
import { Logger } from "../logger";

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
      robot.x = this.x;
      robot.y = this.y;
      robot.direction = this.direction;
      Logger.info(
        `PLACE command executed. Robot placed at X=${robot.x}, Y=${robot.y}, Facing=${robot.direction}`
      );
    } else {
      Logger.warn(
        `Invalid PLACE command: Position (${this.x}, ${this.y}) is out of bounds. Command ignored.`
      );
    }
  }
}
