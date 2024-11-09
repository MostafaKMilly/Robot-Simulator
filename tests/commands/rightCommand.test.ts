import { RightCommand } from "../../src/commands/rightCommand";
import { Robot } from "../../src/robot";
import { Table } from "../../src/table";
import { Logger } from "../../src/logger";

describe("RightCommand", () => {
  let robot: Robot;
  let table: Table;
  let command: RightCommand;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    command = new RightCommand();
    robot.place(0, 0, "NORTH");
    jest.clearAllMocks();
  });

  test("should rotate the robot right from NORTH to EAST", () => {
    command.execute(robot, table);
    expect(robot.direction).toBe("EAST");
    expect(Logger.info).toHaveBeenCalledWith(
      "RIGHT command executed. Robot now facing EAST"
    );
  });

  test("should rotate the robot right from EAST to SOUTH", () => {
    robot.changeDirection("EAST");
    command.execute(robot, table);
    expect(robot.direction).toBe("SOUTH");
    expect(Logger.info).toHaveBeenCalledWith(
      "RIGHT command executed. Robot now facing SOUTH"
    );
  });

  test("should rotate the robot right from SOUTH to WEST", () => {
    robot.changeDirection("SOUTH");
    command.execute(robot, table);
    expect(robot.direction).toBe("WEST");
    expect(Logger.info).toHaveBeenCalledWith(
      "RIGHT command executed. Robot now facing WEST"
    );
  });

  test("should rotate the robot right from WEST to NORTH", () => {
    robot.changeDirection("WEST");
    command.execute(robot, table);
    expect(robot.direction).toBe("NORTH");
    expect(Logger.info).toHaveBeenCalledWith(
      "RIGHT command executed. Robot now facing NORTH"
    );
  });
});
