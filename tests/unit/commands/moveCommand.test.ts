import { MoveCommand } from "../../../src/commands/moveCommand";
import { Robot } from "../../../src/robot";
import { Table } from "../../../src/table";
import { Logger } from "../../../src/logger";

describe("MoveCommand", () => {
  let robot: Robot;
  let table: Table;
  let command: MoveCommand;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    command = new MoveCommand();
    robot.place(1, 2, "NORTH");
    jest.clearAllMocks();
  });

  test("should move the robot north correctly", () => {
    command.execute(robot, table);
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(3);
    expect(Logger.info).toHaveBeenCalledWith(
      "MOVE command executed. Robot moved to X=1, Y=3, Facing=NORTH"
    );
  });

  test("should prevent the robot from moving off the table", () => {
    robot.place(4, 4, "NORTH");
    command.execute(robot, table);
    expect(robot.x).toBe(4);
    expect(robot.y).toBe(4);
    expect(Logger.warn).toHaveBeenCalledWith(
      "MOVE command ignored. Moving to X=4, Y=5 would cause the robot to fall off the table."
    );
  });

  test("should move the robot east correctly", () => {
    robot.place(2, 2, "EAST");
    command.execute(robot, table);
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
    expect(Logger.info).toHaveBeenCalledWith(
      "MOVE command executed. Robot moved to X=3, Y=2, Facing=EAST"
    );
  });

  test("should move the robot south correctly", () => {
    robot.place(2, 2, "SOUTH");
    command.execute(robot, table);
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
    expect(Logger.info).toHaveBeenCalledWith(
      "MOVE command executed. Robot moved to X=2, Y=1, Facing=SOUTH"
    );
  });

  test("should move the robot west correctly", () => {
    robot.place(2, 2, "WEST");
    command.execute(robot, table);
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
    expect(Logger.info).toHaveBeenCalledWith(
      "MOVE command executed. Robot moved to X=1, Y=2, Facing=WEST"
    );
  });
});
