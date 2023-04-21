import { fireEvent, render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import TaskReviewPage from "../TaskReviewPage.svelte";

it("check if appbar has title in center", () => {
  const { getByText } = render(TaskReviewPage);

  const title = getByText("Todo App");
  expect(title).toBeInTheDocument();
  expect(title).toHaveClass("text-center");
});

it("check if input, add and remove button are present", () => {
  const { getByText, getByPlaceholderText } = render(TaskReviewPage);

  const input = getByPlaceholderText("What needs to be done?");
  const addButton = getByText("Add");
  const removeButton = getByText("Remove All");

  expect(input).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
});

it("should add todo to the list when add button is clicked", async () => {
  const { getByPlaceholderText, getByText, getAllByTestId } =
    render(TaskReviewPage);

  const input = getByPlaceholderText("What needs to be done?");
  const addButton = getByText("Add");

  await userEvent.type(input, "Buy groceries");
  await fireEvent.click(addButton);

  expect(getByText("Buy groceries")).toBeInTheDocument();
  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(2); // Original 1 todo + new item
});

it("should add todo to the list when enter key is pressed", async () => {
  const { getByPlaceholderText, getByText, getAllByTestId } =
    render(TaskReviewPage);

  const input = getByPlaceholderText("What needs to be done?");

  await userEvent.type(input, "Buy groceries{enter}");

  expect(getByText("Buy groceries")).toBeInTheDocument();
  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(2); // Original 1 + new item
});

it("should add todo to the list at the bottom", async () => {
  const { getByPlaceholderText, getByText } = render(TaskReviewPage);

  const input = getByPlaceholderText("What needs to be done?");

  await userEvent.type(input, "Buy groceries{enter}");

  expect(getByText("Buy groceries")).toHaveAttribute(
    "data-testid",
    "todo-item-3"
  );
});

it("shouldn't add todo if it is invalid", async () => {
  const { getByPlaceholderText, getByText, getAllByTestId } =
    render(TaskReviewPage);

  const input = getByPlaceholderText("What needs to be done?");

  await userEvent.type(input, "Buy-groceries{enter}");

  const errorMessage = getByText("Please enter a valid todo");
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass("text-red-500 text-md");

  const todoItems = getAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(1); // Original 1
});

it("should remove todo from the list when remove button is clicked", async () => {
  const { getByTestId, queryAllByTestId } = render(TaskReviewPage);

  const removeButton = getByTestId("todo-delete-button-2");

  await fireEvent.click(removeButton); // Remove the first item
  
  const todoItems = queryAllByTestId(/todo-item-.*/);
  expect(todoItems.length).toBe(0); // Original 1 - 1 removed
});

it("should mark todo as done when checked, and move to Done list", async () => {
  const { getByTestId } = render(TaskReviewPage);

  const checkbox = getByTestId("todo-checkbox-2");

  await fireEvent.click(checkbox); // check the third item

  const todoItem = getByTestId("done-item-2");
  expect(todoItem).toHaveClass("italic font-semibold");
  expect(checkbox).toBeChecked();
});

it("should remove all todos from the list when remove button is clicked and there are no todos", async () => {
  const { getByText, queryByTestId } = render(TaskReviewPage);

  const removeAllButton = getByText("Remove All");

  await fireEvent.click(removeAllButton);

  const todoItems = queryByTestId(/todo-item-.*/);
  expect(todoItems).not.toBeTruthy(); // All todos should be removed
});

it("should disable the remove button when there are no todos", async () => {
  const { getByText } = render(TaskReviewPage);

  const removeAllButton = getByText("Remove All");
  await fireEvent.click(removeAllButton);

  expect(removeAllButton).toHaveClass(
    "cursor-not-allowed pointers-events-none bg-red-300"
  );
  expect(removeAllButton).toBeDisabled();
});

it("should show no todo text when there are no todos", async () => {
  const { getByText } = render(TaskReviewPage);

  const removeAllButton = getByText("Remove All");
  await fireEvent.click(removeAllButton);

  expect(getByText("No todos to show!! Add now 👆")).toBeInTheDocument();
});
