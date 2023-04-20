import { fireEvent, render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import TodoList from "../TodoList.svelte";

it("should add todo to the list when add button is clicked", async () => {
  const { getByPlaceholderText, getByText, getAllByTestId } = render(TodoList);

  const input = getByPlaceholderText("What needs to be done?");
  const addButton = getByText("Add");

  await userEvent.type(input, "Buy groceries");
  await fireEvent.click(addButton);

  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(4); // Original 3 + new item
});

it("should add todo to the list when enter key is pressed", async () => {
  const { getByPlaceholderText, getAllByTestId } = render(TodoList);

  const input = getByPlaceholderText("What needs to be done?");

  await userEvent.type(input, "Buy groceries{enter}");

  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(4); // Original 3 + new item
});

it("should remove todo from the list when remove button is clicked", async () => {
  const { getAllByRole, getAllByTestId } = render(TodoList);

  const removeButtons = getAllByRole("button", { name: "❌" });

  await fireEvent.click(removeButtons[1]); // Remove the second item

  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(2); // Original 3 - 1 removed
});

it("should remove all todos from the list when remove button is clicked and there are todos", async () => {
  const { getByText, queryByTestId } = render(TodoList);

  const removeAllButton = getByText("Remove");

  await fireEvent.click(removeAllButton);

  const todoItems = queryByTestId(/todo-item-.*/);
  expect(todoItems).not.toBeTruthy(); // All todos should be removed
});

it("should add todo to the list when enter button is clicked on keyboard", async () => {
  const { getByPlaceholderText, getAllByTestId } = render(TodoList);

  const input = getByPlaceholderText("What needs to be done?");

  await userEvent.type(input, "Buy groceries");
  await userEvent.type(input, "{enter}");

  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(1); // new item
});

it("should disable the remove button when there are no todos", async () => {
  const { getByText } = render(TodoList);

  const removeAllButton = getByText("Remove");
  await fireEvent.click(removeAllButton);

  expect(removeAllButton).toHaveClass(
    "cursor-not-allowed pointers-events-none bg-red-300"
  );
  expect(removeAllButton).toBeDisabled();
});
