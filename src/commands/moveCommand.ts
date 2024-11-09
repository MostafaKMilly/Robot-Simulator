import { Table } from "../table";
import { Logger } from "../logger";
import { RequiresPlacementCommand } from "./requiresPlacementCommand";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";

export class MoveCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot, table: Table): void {
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
