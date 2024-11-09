import { Direction } from "../types/direction.type";
import { IRobot } from "./robot.interface";

export interface IPlacedRobot extends IRobot {
  x: number;
  y: number;
  direction: Direction;
}
