import { BaseCommand } from "./baseCommand";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";
import { Table } from "../table";
import { Logger } from "../logger";
import { Robot } from "../robot";

export abstract class RequiresPlacementCommand extends BaseCommand {
  execute(robot: Robot, table: Table): void {
    if (!robot.isPlaced()) {
      Logger.warn(
        `${this.constructor.name} command ignored: Robot has not been placed.`
      );
      return;
    }

    this.executeWithPlacedRobot(robot, table);
  }

  protected abstract executeWithPlacedRobot(
    robot: IPlacedRobot,
    table: Table
  ): void;
}
