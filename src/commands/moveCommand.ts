import { BaseCommand } from "./baseCommand";
import { Robot } from "../robot";
import { Table } from "../table";

export class MoveCommand extends BaseCommand {
  execute(robot: Robot, table: Table): void {
    let { x, y, direction } = robot;

    switch (direction) {
      case "NORTH":
        y! += 1;
        break;
      case "EAST":
        x! += 1;
        break;
      case "SOUTH":
        y! -= 1;
        break;
      case "WEST":
        x! -= 1;
        break;
    }

    if (table.isValidPosition(x!, y!)) {
      robot.x = x;
      robot.y = y;
    } else {
      console.log("Move ignored: Robot would fall off the table.");
    }
  }
}
