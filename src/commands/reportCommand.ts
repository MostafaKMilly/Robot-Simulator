import { BaseCommand } from "./baseCommand";
import { Robot } from "../robot";

export class ReportCommand extends BaseCommand {
  execute(robot: Robot): void {
    if (!robot.isPlaced()) return;

    console.log(`Output: ${robot.x},${robot.y},${robot.direction}`);
  }
}
