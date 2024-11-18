import { Logger } from "../logger";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";
import { RequiresPlacementCommand } from "./requiresPlacementCommand";
import { DIRECTIONS } from "../constants/directions";

export class LeftCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot): void {
    const idx = DIRECTIONS.indexOf(robot.direction);
    robot.changeDirection(DIRECTIONS[(idx + 1) % 4]);
    Logger.info(`Robot now facing ${robot.direction}`);
  }
}
