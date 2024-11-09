import {
  BaseCommand,
  LeftCommand,
  MoveCommand,
  PlaceCommand,
  ReportCommand,
  RightCommand,
} from "./commands";
import { Logger } from "./logger";
import { Robot } from "./robot";
import { Table } from "./table";
import { Direction } from "./types/direction.type";

export class Commander {
  private robot: Robot;
  private table: Table;

  constructor(robot: Robot, table: Table) {
    this.robot = robot;
    this.table = table;
  }

  parseCommand(input: string): BaseCommand | null {
    const [commandStr, argsStr] = input.trim().split(" ");
    const command = commandStr.toUpperCase();

    switch (command) {
      case "PLACE":
        if (argsStr) {
          const [xStr, yStr, directionStr] = argsStr.split(",");
          const x = parseInt(xStr, 10);
          const y = parseInt(yStr, 10);
          const direction = directionStr.toUpperCase() as Direction;
          if (
            isNaN(x) ||
            isNaN(y) ||
            !["NORTH", "EAST", "SOUTH", "WEST"].includes(direction)
          ) {
            console.error("Invalid PLACE command.");
            return null;
          }
          return new PlaceCommand(x, y, direction);
        }
        console.error("Invalid PLACE command: Missing arguments.");
        return null;
      case "MOVE":
        return new MoveCommand();
      case "LEFT":
        return new LeftCommand();
      case "RIGHT":
        return new RightCommand();
      case "REPORT":
        return new ReportCommand();
      default:
        console.error(`Unknown command: ${command}`);
        return null;
    }
  }

  executeCommand(command: BaseCommand): void {
    try {
      command.execute(this.robot, this.table);
    } catch (error) {
      Logger.error((error as Error).message);
    }
  }
}
