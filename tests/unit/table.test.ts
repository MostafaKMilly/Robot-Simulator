import { Table } from "../../src/table";

describe("Table Class", () => {
  let table: Table;

  beforeEach(() => {
    table = new Table();
  });

  test("should initialize with default width and height", () => {
    expect(table.width).toBe(5);
    expect(table.height).toBe(5);
  });

  test("should validate positions correctly", () => {
    expect(table.isValidPosition(0, 0)).toBe(true);
    expect(table.isValidPosition(4, 4)).toBe(true);
    expect(table.isValidPosition(-1, 0)).toBe(false);
    expect(table.isValidPosition(0, -1)).toBe(false);
    expect(table.isValidPosition(5, 5)).toBe(false);
    expect(table.isValidPosition(3, 5)).toBe(false);
    expect(table.isValidPosition(5, 3)).toBe(false);
  });

  test("should allow custom table dimensions", () => {
    const customTable = new Table(10, 10);
    expect(customTable.width).toBe(10);
    expect(customTable.height).toBe(10);
    expect(customTable.isValidPosition(9, 9)).toBe(true);
    expect(customTable.isValidPosition(10, 10)).toBe(false);
  });
});
