import {
  BaseCommand,
  LeftCommand,
  MoveCommand,
  ReportCommand,
  RightCommand,
} from "./commands";
import { parsePlaceCommand } from "./helpers/parsePlaceCommand";
import { Logger } from "./logger";
import { Robot } from "./robot";
import { Table } from "./table";

export class Commander {
  private robot: Robot;
  private table: Table;

  constructor(robot: Robot, table: Table) {
    this.robot = robot;
    this.table = table;
  }

  parseCommand(input: string): BaseCommand | null {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      Logger.error("Empty command received.");
      return null;
    }

    const [commandStr, ...argsArr] = trimmedInput.split(" ");
    const command = commandStr.toUpperCase();
    const argsStr = argsArr.join(" ");

    switch (command) {
      case "PLACE":
        return parsePlaceCommand(argsStr);
      case "MOVE":
        return new MoveCommand();
      case "LEFT":
        return new LeftCommand();
      case "RIGHT":
        return new RightCommand();
      case "REPORT":
        return new ReportCommand();
      default:
        Logger.error(`Unknown command: ${command}`);
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
