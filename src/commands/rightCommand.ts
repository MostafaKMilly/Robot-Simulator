import { Logger } from "../logger";
import { Robot } from "../robot";
import { Direction } from "../types/direction.type";
import { BaseCommand } from "./baseCommand";

export class RightCommand extends BaseCommand {
  execute(robot: Robot): void {
    if (!robot.isPlaced()) {
      Logger.warn("Right command ignored: Robot has not been placed.");
      return;
    }

    const directions: Direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];
    const idx = directions.indexOf(robot.direction);
    robot.changeDirection(directions[(idx + 1) % 4]);
    Logger.info(`RIGHT command executed. Robot now facing ${robot.direction}`);
  }
}
