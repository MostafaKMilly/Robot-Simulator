import { Robot } from "./robot";
import { Table } from "./table";
import { Commander } from "./commander";
import * as readline from "readline";

const robot = new Robot();
const table = new Table();
const commander = new Commander(robot, table);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

console.log("Welcome to the Toy Robot Simulator!");
console.log("You can enter the following commands:");
console.log("- PLACE X,Y,F (e.g., PLACE 0,0,NORTH)");
console.log("- MOVE");
console.log("- LEFT");
console.log("- RIGHT");
console.log("- REPORT");
console.log("- EXIT to quit the application.\n");
console.log("Enter your commands below:\n");

rl.on("line", (input) => {
  const trimmedInput = input.trim();
  const upperInput = trimmedInput.toUpperCase();

  if (upperInput === "EXIT") {
    console.log("Exiting the Toy Robot Simulator. Goodbye!");
    rl.close();
    return;
  }

  const command = commander.parseCommand(trimmedInput);
  if (command) {
    commander.executeCommand(command);
  } else {
    console.log(
      `\nInvalid command: "${trimmedInput}". Please enter a valid command.\n`
    );
    console.log(
      "Available commands: PLACE X,Y,F | MOVE | LEFT | RIGHT | REPORT | EXIT\n"
    );
  }
});
