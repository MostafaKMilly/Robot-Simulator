import { Robot } from "../src/robot";

describe("Robot Class", () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  test("should not be placed initially", () => {
    expect(robot.isPlaced()).toBe(false);
    expect(robot.x).toBeNull();
    expect(robot.y).toBeNull();
    expect(robot.direction).toBeNull();
  });

  test("should place the robot correctly", () => {
    robot.place(1, 2, "NORTH");
    expect(robot.isPlaced()).toBe(true);
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
    expect(robot.direction).toBe("NORTH");
  });

  test("should change position correctly", () => {
    robot.place(1, 2, "NORTH");
    robot.changePosition(3, 3);
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(3);
  });

  test("should change direction correctly", () => {
    robot.place(1, 2, "NORTH");
    robot.changeDirection("EAST");
    expect(robot.direction).toBe("EAST");
  });

  test("should output the correct position and direction", () => {
    console.log = jest.fn();
    robot.place(0, 0, "WEST");
    robot.output();
    expect(console.log).toHaveBeenCalledWith("Output: 0,0,WEST");
  });
});
