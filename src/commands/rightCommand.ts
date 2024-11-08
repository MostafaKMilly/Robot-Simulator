import { Robot } from "../robot";
import { Direction } from "../types/direction.type";
import { BaseCommand } from "./baseCommand";

export class RightCommand extends BaseCommand {
  execute(robot: Robot): void {
    if (!robot.isPlaced()) return;

    const directions: Direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];
    const idx = directions.indexOf(robot.direction!);
    robot.direction = directions[(idx + 1) % 4];
  }
}
