import { render } from "@testing-library/svelte";
import Item from "../Item.svelte";

const mockItem = { todo: "Buy groceries", status: false, todoId: 0 };
let mockRemoveFromList = () => {};

it("should display the todo item correctly", () => {
  const { getByTestId } = render(Item, {
    props: {
      item: mockItem,
      removeFromList: mockRemoveFromList,
      onChange: () => {},
    },
  });

  const todoItem = getByTestId("todo-item-0");
  const checkbox = getByTestId("todo-checkbox-0");
  const deleteButton = getByTestId("todo-delete-button-0");

  expect(todoItem).toHaveTextContent(mockItem.todo);
  expect(todoItem).not.toHaveClass("italic font-semibold");
  expect(checkbox).not.toBeChecked();
  expect(deleteButton).toBeInTheDocument();
});

it("should display the delete button with svg in todo", () => {
  const { getByTestId } = render(Item, {
    props: {
      item: mockItem,
      removeFromList: mockRemoveFromList,
      onChange: () => {},
    },
  });

  const deleteButton = getByTestId("todo-delete-button-0");

  expect(deleteButton).toBeInTheDocument();
  expect(deleteButton).toContainElement(getByTestId("delete-svg"));
});

it("should check the checkbox when the item is completed", () => {
  const { getByTestId } = render(Item, {
    props: {
      item: { ...mockItem, status: true },
      removeFromList: mockRemoveFromList,
      onChange: () => {},
    },
  });

  const todoItem = getByTestId("done-item-0");
  const checkbox = getByTestId("done-checkbox-0");

  expect(todoItem).toHaveClass("italic font-semibold");
  expect(checkbox).toBeChecked();
});
