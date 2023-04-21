import { fetchTodoList } from "./api_utils";

export function isValidTodo(todo: string): boolean {
  if (todo == null || todo === undefined) {
    return false;
  }
  if (todo.trim().length === 0) {
    return false;
  }
  const todoRegex = /^[a-zA-Z0-9 ]*$/;
  return todoRegex.test(todo);
}

export function cleanTodo(todo: string): string {
  todo = todo.trim();
  todo = todo.replace(/\s+/g, " ");
  return todo;
}

export async function getTodos() {
  var todoList = await fetchTodoList();
  return todoList;
}

export async function getTodosCount() {
  var todoList = await getTodos();
  return todoList.length;
}
