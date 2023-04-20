import { render } from "@testing-library/svelte";
import TodoItem from "../TodoItem.svelte";

const mockItem = { todo: "Buy groceries", status: false };
const mockIndex = 0;
let mockRemoveFromList = () => {};

it("should display the todo item correctly", () => {
  const { getByTestId } = render(TodoItem, {
    props: {
      item: mockItem,
      index: mockIndex,
      removeFromList: mockRemoveFromList,
    },
  });

  const todoItem = getByTestId("todo-item-0");
  const checkbox = getByTestId("checkbox-0");
  const deleteButton = getByTestId("delete-button-0");

  expect(todoItem).toHaveTextContent(mockItem.todo);
  expect(todoItem).not.toHaveClass("line-through italic font-semibold");
  expect(checkbox).not.toBeChecked();
  expect(deleteButton).toBeInTheDocument();
});

it("should check the checkbox when the item is completed", () => {
  const { getByTestId } = render(TodoItem, {
    props: {
      item: { ...mockItem, status: true },
      index: mockIndex,
      removeFromList: mockRemoveFromList,
    },
  });

  const todoItem = getByTestId("todo-item-0");
  const checkbox = getByTestId("checkbox-0");

  expect(todoItem).toHaveClass("line-through italic font-semibold");
  expect(checkbox).toBeChecked();
});
