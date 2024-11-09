import { ReportCommand } from "../../../src/commands/reportCommand";
import { Robot } from "../../../src/robot";
import { Table } from "../../../src/table";

describe("ReportCommand", () => {
  let robot: Robot;
  let table: Table;
  let command: ReportCommand;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    command = new ReportCommand();
    robot.place(1, 2, "EAST");
    jest.clearAllMocks();
  });

  test("should output the current position and direction of the robot", () => {
    console.log = jest.fn();
    command.execute(robot, table);
    expect(console.log).toHaveBeenCalledWith("Output: 1,2,EAST");
  });

  test("should not output if the robot is not placed", () => {
    robot = new Robot(); // Reset robot to not placed
    console.log = jest.fn();
    command.execute(robot, table);
    expect(console.log).not.toHaveBeenCalled();
  });
});
