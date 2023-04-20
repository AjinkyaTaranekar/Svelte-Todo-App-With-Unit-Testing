import { isValidTodo } from "../todo_utils";

it("should return true for valid todos", () => {
  expect(isValidTodo("BuyGroceries123")).toBe(true);
  expect(isValidTodo("GoToTheGym")).toBe(true);
  expect(isValidTodo("ReadABook")).toBe(true);
  expect(isValidTodo("1234567890")).toBe(true);
  expect(isValidTodo("Buy Groceries")).toBe(true);
});

it("should return false for invalid todos", () => {
  expect(isValidTodo("")).toBe(false);
  expect(isValidTodo(" ")).toBe(false);
  expect(isValidTodo("  ")).toBe(false);
  expect(isValidTodo("Buy_Groceries")).toBe(false);
  expect(isValidTodo("Buy!Groceries")).toBe(false);
  expect(isValidTodo("Buy-Groceries")).toBe(false);
});

it("null or underfined todos, shouldn't be allowed", () => {
  expect(isValidTodo(null)).toBe(false);
  expect(isValidTodo(undefined)).toBe(false);
});
