import { Robot } from "../robot";
import { Table } from "../table";

export abstract class BaseCommand {
  abstract execute(robot: Robot, table: Table): void;
}
