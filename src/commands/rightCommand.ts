import { IPlacedRobot } from "../interfaces/placedRobot.interface";
import { Logger } from "../logger";
import { Direction } from "../types/direction.type";
import { RequiresPlacementCommand } from "./requiresPlacementCommand";

export class RightCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot): void {
    const directions: Direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];
    const idx = directions.indexOf(robot.direction);
    robot.changeDirection(directions[(idx + 1) % 4]);
    Logger.info(`RIGHT command executed. Robot now facing ${robot.direction}`);
  }
}
