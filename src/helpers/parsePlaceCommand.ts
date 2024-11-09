import { BaseCommand, PlaceCommand } from "../commands";
import { Direction } from "../types/direction.type";
import { Logger } from "../logger";

export function parsePlaceCommand(argsStr: string): BaseCommand | null {
  const placeRegex = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|EAST|SOUTH|WEST)\s*$/i;
  const match = argsStr.match(placeRegex);

  if (!match) {
    Logger.error("Invalid PLACE command format. Expected format: PLACE X,Y,F");
    return null;
  }

  const x = parseInt(match[1], 10);
  const y = parseInt(match[2], 10);
  const direction = match[3].toUpperCase() as Direction;

  if (
    isNaN(x) ||
    isNaN(y) ||
    !["NORTH", "EAST", "SOUTH", "WEST"].includes(direction)
  ) {
    Logger.error("Invalid PLACE command: Incorrect argument types.");
    return null;
  }

  return new PlaceCommand(x, y, direction);
}
