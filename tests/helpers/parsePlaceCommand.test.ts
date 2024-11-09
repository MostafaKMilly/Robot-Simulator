import { parsePlaceCommand } from "../../src/helpers/parsePlaceCommand";
import { PlaceCommand } from "../../src/commands/placeCommand";
import { Logger } from "../../src/logger";

describe("parsePlaceCommand Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should parse valid PLACE command string", () => {
    const argsStr = "3,4,SOUTH";
    const command = parsePlaceCommand(argsStr);
    expect(command).toBeInstanceOf(PlaceCommand);
    const placeCommand = command as PlaceCommand;
    expect((placeCommand as any).x).toBe(3);
    expect((placeCommand as any).y).toBe(4);
    expect((placeCommand as any).direction).toBe("SOUTH");
  });

  test("should return null for invalid format", () => {
    const argsStr = "3,4";
    const command = parsePlaceCommand(argsStr);
    expect(command).toBeNull();
    expect(Logger.error).toHaveBeenCalledWith(
      "Invalid PLACE command format. Expected format: PLACE X,Y,F"
    );
  });

  test("should return null for non-numeric coordinates", () => {
    const argsStr = "a,b,NORTH";
    const command = parsePlaceCommand(argsStr);
    expect(command).toBeNull();
    expect(Logger.error).toHaveBeenCalledWith(
      "Invalid PLACE command format. Expected format: PLACE X,Y,F"
    );
  });

  test("should return null for invalid direction", () => {
    const argsStr = "1,2,NORTHEAST";
    const command = parsePlaceCommand(argsStr);
    expect(command).toBeNull();
    expect(Logger.error).toHaveBeenCalledWith(
      "Invalid PLACE command format. Expected format: PLACE X,Y,F"
    );
  });

  test("should parse command case-insensitively", () => {
    const argsStr = "1,2,north";
    const command = parsePlaceCommand(argsStr);
    expect(command).toBeInstanceOf(PlaceCommand);
    const placeCommand = command as PlaceCommand;
    expect((placeCommand as any).direction).toBe("NORTH");
  });
});
