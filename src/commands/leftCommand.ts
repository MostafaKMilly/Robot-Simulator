import { Direction } from "../types/direction.type";
import { Logger } from "../logger";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";
import { RequiresPlacementCommand } from "./requiresPlacementCommand";

export class LeftCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot): void {
    const directions: Direction[] = ["NORTH", "WEST", "SOUTH", "EAST"];
    const idx = directions.indexOf(robot.direction);
    robot.changeDirection(directions[(idx + 1) % 4]);
    Logger.info(`Robot now facing ${robot.direction}`);
  }
}
