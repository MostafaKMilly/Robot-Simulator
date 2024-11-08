// src/commands/rotateCommand.ts

import { BaseCommand } from "./baseCommand";
import { Robot } from "../robot";
import { Direction } from "../types/direction.type";

export class LeftCommand extends BaseCommand {
  execute(robot: Robot): void {
    if (!robot.isPlaced()) return;

    const directions: Direction[] = ["NORTH", "WEST", "SOUTH", "EAST"];
    const idx = directions.indexOf(robot.direction!);
    robot.direction = directions[(idx + 1) % 4];
  }
}
