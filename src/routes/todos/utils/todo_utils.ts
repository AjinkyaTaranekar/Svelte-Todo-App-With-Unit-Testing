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
