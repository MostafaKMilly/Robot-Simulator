import { PlaceCommand } from "../../src/commands/placeCommand";
import { Robot } from "../../src/robot";
import { Table } from "../../src/table";
import { Logger } from "../../src/logger";

describe("PlaceCommand", () => {
  let robot: Robot;
  let table: Table;
  let command: PlaceCommand;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    jest.clearAllMocks();
  });

  test("should place the robot on the table if position is valid", () => {
    command = new PlaceCommand(0, 0, "NORTH");
    command.execute(robot, table);

    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.direction).toBe("NORTH");
    expect(Logger.info).toHaveBeenCalledWith(
      "PLACE command executed. Robot placed at X=0, Y=0, Facing=NORTH"
    );
  });

  test("should not place the robot if position is invalid", () => {
    command = new PlaceCommand(5, 5, "NORTH");
    command.execute(robot, table);

    expect(robot.x).toBeNull();
    expect(robot.y).toBeNull();
    expect(robot.direction).toBeNull();
    expect(Logger.warn).toHaveBeenCalledWith(
      "Invalid PLACE command: Position (5, 5) is out of bounds. Command ignored."
    );
  });
});
