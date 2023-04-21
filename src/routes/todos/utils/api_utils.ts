export async function fetchTodoList() {
  var response = await fetch('https://613594af60d2900017c3c05f.mockapi.io/getTodos');
  return response.json();
}