import { LeftCommand } from "../../../src/commands/leftCommand";
import { Robot } from "../../../src/robot";
import { Table } from "../../../src/table";
import { Logger } from "../../../src/logger";

describe("LeftCommand", () => {
  let robot: Robot;
  let table: Table;
  let command: LeftCommand;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    command = new LeftCommand();
    robot.place(0, 0, "NORTH");
    jest.clearAllMocks();
  });

  test("should rotate the robot left from NORTH to WEST", () => {
    command.execute(robot, table);
    expect(robot.direction).toBe("WEST");
    expect(Logger.info).toHaveBeenCalledWith("Robot now facing WEST");
  });

  test("should rotate the robot left from WEST to SOUTH", () => {
    robot.changeDirection("WEST");
    command.execute(robot, table);
    expect(robot.direction).toBe("SOUTH");
    expect(Logger.info).toHaveBeenCalledWith("Robot now facing SOUTH");
  });

  test("should rotate the robot left from SOUTH to EAST", () => {
    robot.changeDirection("SOUTH");
    command.execute(robot, table);
    expect(robot.direction).toBe("EAST");
    expect(Logger.info).toHaveBeenCalledWith("Robot now facing EAST");
  });

  test("should rotate the robot left from EAST to NORTH", () => {
    robot.changeDirection("EAST");
    command.execute(robot, table);
    expect(robot.direction).toBe("NORTH");
    expect(Logger.info).toHaveBeenCalledWith("Robot now facing NORTH");
  });
});
