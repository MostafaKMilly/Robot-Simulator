import { BaseCommand } from "./baseCommand";
import { Robot } from "../robot";
import { Table } from "../table";
import { Logger } from "../logger";

export class MoveCommand extends BaseCommand {
  execute(robot: Robot, table: Table): void {
    if (!robot.isPlaced()) {
      Logger.warn("Move command ignored: Robot has not been placed.");
      return;
    }

    let { x, y, direction } = robot;
    let newX = x;
    let newY = y;

    switch (direction) {
      case "NORTH":
        newY += 1;
        break;
      case "EAST":
        newX += 1;
        break;
      case "SOUTH":
        newY -= 1;
        break;
      case "WEST":
        newX -= 1;
        break;
    }

    if (table.isValidPosition(newX, newY)) {
      robot.changePosition(newX, newY);
      Logger.info(
        `MOVE command executed. Robot moved to X=${robot.x}, Y=${robot.y}, Facing=${robot.direction}`
      );
    } else {
      Logger.warn(
        `MOVE command ignored. Moving to X=${newX}, Y=${newY} would cause the robot to fall off the table.`
      );
    }
  }
}
