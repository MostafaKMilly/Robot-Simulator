import { RequiresPlacementCommand } from "./requiresPlacementCommand";
import { IPlacedRobot } from "../interfaces/placedRobot.interface";

export class ReportCommand extends RequiresPlacementCommand {
  executeWithPlacedRobot(robot: IPlacedRobot): void {
    robot.output();
  }
}
