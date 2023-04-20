import { cleanTodo } from "../todo_utils";

it("should remove leading and trailing spaces", () => {
  expect(cleanTodo("   Buy Groceries   ")).toBe("Buy Groceries");
  expect(cleanTodo("   GoToTheGym   ")).toBe("GoToTheGym");
  expect(cleanTodo("   Read A Book   ")).toBe("Read A Book");
});

it("should replace multiple spaces with a single space", () => {
  expect(cleanTodo("Buy    Groceries")).toBe("Buy Groceries");
  expect(cleanTodo("GoToTheGym     Now")).toBe("GoToTheGym Now");
  expect(cleanTodo("Read     A     Book")).toBe("Read A Book");
});

it("should not modify strings with no leading/trailing spaces", () => {
  expect(cleanTodo("BuyGroceries")).toBe("BuyGroceries");
  expect(cleanTodo("GoToTheGymNow")).toBe("GoToTheGymNow");
  expect(cleanTodo("ReadABook")).toBe("ReadABook");
});
