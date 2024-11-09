import { Commander } from "../../src/commander";
import { Robot } from "../../src/robot";
import { Table } from "../../src/table";
import {
  BaseCommand,
  PlaceCommand,
  MoveCommand,
  LeftCommand,
  RightCommand,
  ReportCommand,
} from "../../src/commands";
import { Logger } from "../../src/logger";

describe("Commander Class", () => {
  let robot: Robot;
  let table: Table;
  let commander: Commander;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    commander = new Commander(robot, table);
    jest.clearAllMocks();
  });

  test("should parse PLACE command correctly", () => {
    const command = commander.parseCommand("PLACE 1,2,EAST");
    expect(command).toBeInstanceOf(PlaceCommand);
    const placeCommand = command as PlaceCommand;
    expect(placeCommand).toBeDefined();
  });

  test("should return null for invalid PLACE command format", () => {
    const command = commander.parseCommand("PLACE 1,2");
    expect(command).toBeNull();
    expect(Logger.error).toHaveBeenCalledWith(
      "Invalid PLACE command format. Expected format: PLACE X,Y,F"
    );
  });

  test("should parse MOVE command correctly", () => {
    const command = commander.parseCommand("MOVE");
    expect(command).toBeInstanceOf(MoveCommand);
  });

  test("should parse LEFT command correctly", () => {
    const command = commander.parseCommand("LEFT");
    expect(command).toBeInstanceOf(LeftCommand);
  });

  test("should parse RIGHT command correctly", () => {
    const command = commander.parseCommand("RIGHT");
    expect(command).toBeInstanceOf(RightCommand);
  });

  test("should parse REPORT command correctly", () => {
    const command = commander.parseCommand("REPORT");
    expect(command).toBeInstanceOf(ReportCommand);
  });

  test("should return null for unknown commands", () => {
    const command = commander.parseCommand("JUMP");
    expect(command).toBeNull();
    expect(Logger.error).toHaveBeenCalledWith("Unknown command: JUMP");
  });

  test("should handle empty input gracefully", () => {
    const command = commander.parseCommand("   ");
    expect(command).toBeNull();
    expect(Logger.error).toHaveBeenCalledWith("Empty command received.");
  });

  test("should execute a valid command", () => {
    const placeCommand = new PlaceCommand(0, 0, "NORTH");
    const moveCommand = new MoveCommand();

    commander.executeCommand(placeCommand);
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.direction).toBe("NORTH");

    commander.executeCommand(moveCommand);
    expect(robot.y).toBe(1);
  });

  test("should catch and log errors during command execution", () => {
    const faultyCommand: BaseCommand = {
      execute: () => {
        throw new Error("Test Error");
      },
    };

    commander.executeCommand(faultyCommand);
    expect(Logger.error).toHaveBeenCalledWith("Test Error");
  });
});
