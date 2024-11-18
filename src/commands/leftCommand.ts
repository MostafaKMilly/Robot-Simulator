import { Logger } from "../logger";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";
import { RequiresPlacementCommand } from "./requiresPlacementCommand";
import { DIRECTIONS } from "../constants/directions";

export class LeftCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot): void {
    const idx = DIRECTIONS.indexOf(robot.direction);
    const newIdx = (idx - 1 + DIRECTIONS.length) % DIRECTIONS.length;
    robot.changeDirection(DIRECTIONS[newIdx]);
    Logger.info(`Robot now facing ${robot.direction}`);
  }
}
