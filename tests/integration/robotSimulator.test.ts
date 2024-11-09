import { spawn } from "child_process";
import * as path from "path";

interface TestCase {
  id: string;
  description: string;
  inputCommands: string[];
  expectedOutputs: string[];
  expectedErrorOutputs?: string[];
}

const testCases: TestCase[] = [
  {
    id: "TC01",
    description: "Simple Movement",
    inputCommands: ["PLACE 0,0,NORTH", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 0,1,NORTH"],
  },
  {
    id: "TC02",
    description: "Rotation Without Movement",
    inputCommands: ["PLACE 0,0,NORTH", "LEFT", "REPORT"],
    expectedOutputs: ["Output: 0,0,WEST"],
  },
  {
    id: "TC03",
    description: "Complex Sequence",
    inputCommands: ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 3,3,NORTH"],
  },
  {
    id: "TC04",
    description: "Prevent Falling - South Boundary",
    inputCommands: ["PLACE 0,0,SOUTH", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 0,0,SOUTH"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=0, Y=-1 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC05",
    description: "Prevent Falling - East Boundary",
    inputCommands: ["PLACE 4,4,EAST", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 4,4,EAST"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=5, Y=4 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC06",
    description: "Prevent Falling - North Boundary",
    inputCommands: ["PLACE 2,4,NORTH", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 2,4,NORTH"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=2, Y=5 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC07",
    description: "Prevent Falling - West Boundary",
    inputCommands: ["PLACE 0,3,WEST", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 0,3,WEST"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=-1, Y=3 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC08",
    description: "Multiple Valid PLACE Commands",
    inputCommands: [
      "PLACE 0,0,NORTH",
      "MOVE",
      "PLACE 2,3,EAST",
      "MOVE",
      "REPORT",
    ],
    expectedOutputs: ["Output: 3,3,EAST"],
  },
  {
    id: "TC09",
    description: "PLACE Command Overwriting Previous Position",
    inputCommands: [
      "PLACE 1,1,SOUTH",
      "MOVE",
      "PLACE 3,3,WEST",
      "MOVE",
      "REPORT",
    ],
    expectedOutputs: ["Output: 2,3,WEST"],
  },
  {
    id: "TC10",
    description: "Commands Before PLACE",
    inputCommands: [
      "MOVE",
      "LEFT",
      "REPORT",
      "PLACE 1,1,NORTH",
      "MOVE",
      "REPORT",
    ],
    expectedOutputs: ["Output: 1,2,NORTH"],
    expectedErrorOutputs: [
      "[WARN]: MoveCommand command ignored: Robot has not been placed.",
      "[WARN]: LeftCommand command ignored: Robot has not been placed.",
      "[WARN]: ReportCommand command ignored: Robot has not been placed.",
    ],
  },
  {
    id: "TC11",
    description: "Invalid PLACE Command Format",
    inputCommands: ["PLACE 1,2", "MOVE", "REPORT"],
    expectedOutputs: [],
    expectedErrorOutputs: [
      "[ERROR]: Invalid PLACE command format. Expected format: PLACE X,Y,F",
      "[WARN]: MoveCommand command ignored: Robot has not been placed.",
      "[WARN]: ReportCommand command ignored: Robot has not been placed.",
    ],
  },
  {
    id: "TC12",
    description: "Non-Numeric Coordinates",
    inputCommands: ["PLACE a,b,NORTH", "MOVE", "REPORT"],
    expectedOutputs: [],
    expectedErrorOutputs: [
      "[ERROR]: Invalid PLACE command format. Expected format: PLACE X,Y,F",
      "[WARN]: MoveCommand command ignored: Robot has not been placed.",
      "[WARN]: ReportCommand command ignored: Robot has not been placed.",
    ],
  },
  {
    id: "TC13",
    description: "Invalid Direction",
    inputCommands: ["PLACE 1,2,NORTHEAST", "MOVE", "REPORT"],
    expectedOutputs: [],
    expectedErrorOutputs: [
      "[ERROR]: Invalid PLACE command format. Expected format: PLACE X,Y,F",
      "[WARN]: MoveCommand command ignored: Robot has not been placed.",
      "[WARN]: ReportCommand command ignored: Robot has not been placed.",
    ],
  },
  {
    id: "TC14",
    description: "Unknown Commands",
    inputCommands: ["PLACE 0,0,NORTH", "JUMP", "REPORT"],
    expectedOutputs: ["Output: 0,0,NORTH"],
    expectedErrorOutputs: ["[ERROR]: Unknown command: JUMP"],
  },
  {
    id: "TC15",
    description: "Extra Arguments in Commands",
    inputCommands: [
      "PLACE 1,2,NORTH",
      "MOVE extra",
      "LEFT extra1 extra2",
      "REPORT extra",
    ],
    expectedOutputs: ["Output: 1,3,WEST"],
  },
  {
    id: "TC16",
    description: "PLACE at Origin",
    inputCommands: [
      "PLACE 0,0,NORTH",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "REPORT",
    ],
    expectedOutputs: ["Output: 0,4,NORTH"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=0, Y=5 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC17",
    description: "PLACE at Maximum Coordinates",
    inputCommands: [
      "PLACE 4,4,NORTH",
      "MOVE",
      "REPORT",
      "PLACE 4,4,EAST",
      "MOVE",
      "REPORT",
    ],
    expectedOutputs: ["Output: 4,4,NORTH", "Output: 4,4,EAST"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=4, Y=5 would cause the robot to fall off the table.",
      "[WARN]: MOVE command ignored. Moving to X=5, Y=4 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC18",
    description: "MOVE Multiple Times to Boundary",
    inputCommands: ["PLACE 2,2,SOUTH", "MOVE", "MOVE", "MOVE", "REPORT"],
    expectedOutputs: ["Output: 2,0,SOUTH"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=2, Y=-1 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC19",
    description: "Case-Insensitive Commands",
    inputCommands: [
      "place 1,2,west",
      "move",
      "MOVE",
      "left",
      "Right",
      "report",
      "REPORT",
    ],
    expectedOutputs: ["Output: 0,2,WEST"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=-1, Y=2 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC20",
    description: "Commands with Extra Whitespaces",
    inputCommands: [
      "   PLACE    3 , 3 , EAST   ",
      "MOVE   ",
      "  MOVE",
      "LEFT   ",
      "  REPORT",
    ],
    expectedOutputs: ["Output: 4,3,NORTH"],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=5, Y=3 would cause the robot to fall off the table.",
    ],
  },
  {
    id: "TC21",
    description: "Rapid Sequence of Commands",
    inputCommands: [
      "PLACE 2,2,NORTH",
      "MOVE",
      "LEFT",
      "MOVE",
      "RIGHT",
      "MOVE",
      "REPORT",
      "MOVE",
      "MOVE",
      "LEFT",
      "LEFT",
      "MOVE",
      "REPORT",
      "PLACE 4,4,SOUTH",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "REPORT",
    ],
    expectedOutputs: [
      "Output: 1,4,NORTH",
      "Output: 1,3,SOUTH",
      "Output: 4,0,SOUTH",
    ],
    expectedErrorOutputs: [
      "[WARN]: MOVE command ignored. Moving to X=1, Y=5 would cause the robot to fall off the table.",
      "[WARN]: MOVE command ignored. Moving to X=1, Y=5 would cause the robot to fall off the table.",
      "[WARN]: MOVE command ignored. Moving to X=4, Y=-1 would cause the robot to fall off the table.",
    ],
  },
];

describe("Robot Simulator Integration Tests", () => {
  testCases.forEach((testCase) => {
    it(`${testCase.id}: ${testCase.description}`, (done) => {
      const mainPath = path.join(__dirname, "../../dist/main.js");

      const robotProcess = spawn("node", [mainPath]);

      let outputData: string[] = [];
      let errorData: string[] = [];

      robotProcess.stdout.on("data", (data: Buffer) => {
        const lines: string[] = data
          .toString()
          .split("\n")
          .map((line: string) => line.trim())
          .filter((line: string) => line !== "");
        outputData.push(...lines);

        if (
          lines.includes("REPORT") ||
          lines.some((line: string) => line.startsWith("Output:"))
        ) {
          robotProcess.stdin.end();
        }
      });

      robotProcess.stderr.on("data", (data: Buffer) => {
        const lines: string[] = data
          .toString()
          .split("\n")
          .map((line: string) => line.trim())
          .filter((line: string) => line !== "");
        errorData.push(...lines);
      });

      robotProcess.on("close", (code: number) => {
        if (
          testCase.expectedErrorOutputs &&
          testCase.expectedErrorOutputs.length > 0
        ) {
          testCase.expectedErrorOutputs.forEach((expectedError: string) => {
            expect(errorData).toContain(expectedError);
          });
        } else {
          expect(errorData).toHaveLength(0);
        }

        const reportOutputs = outputData.filter((line) =>
          line.startsWith("Output:")
        );

        testCase.expectedOutputs.forEach((expectedOutput: string) => {
          if (expectedOutput) {
            expect(reportOutputs).toContain(expectedOutput);
          }
        });

        done();
      });

      testCase.inputCommands.forEach((cmd: string) => {
        robotProcess.stdin.write(cmd + "\n");
      });

      setTimeout(() => {
        robotProcess.kill();
        done();
      }, 1000);
    });
  });
});
