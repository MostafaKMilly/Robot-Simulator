import { BaseCommand } from "./baseCommand";
import { Robot } from "../robot";
import { Logger } from "../logger";

export class ReportCommand extends BaseCommand {
  execute(robot: Robot): void {
    if (!robot.isPlaced()) {
      Logger.warn("Report command ignored: Robot has not been placed.");
    }

    console.log(`Output: ${robot.x},${robot.y},${robot.direction}`);
  }
}
