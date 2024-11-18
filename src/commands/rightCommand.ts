import { DIRECTIONS } from "../constants/directions";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";
import { Logger } from "../logger";
import { RequiresPlacementCommand } from "./requiresPlacementCommand";

export class RightCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot): void {
    const idx = DIRECTIONS.indexOf(robot.direction);
    robot.changeDirection(DIRECTIONS[(idx + 1) % 4]);
    Logger.info(`RIGHT command executed. Robot now facing ${robot.direction}`);
  }
}
