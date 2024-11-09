import { BaseCommand } from "./baseCommand";
import { Robot } from "../robot";
import { Direction } from "../types/direction.type";
import { Logger } from "../logger";

export class LeftCommand extends BaseCommand {
  execute(robot: Robot): void {
    if (!robot.isPlaced()) {
      Logger.warn("Left command ignored: Robot has not been placed.");
      return;
    }

    const directions: Direction[] = ["NORTH", "WEST", "SOUTH", "EAST"];
    const idx = directions.indexOf(robot.direction);
    robot.changeDirection(directions[(idx + 1) % 4]);
    Logger.info(`Robot now facing ${robot.direction}`);
  }
}
