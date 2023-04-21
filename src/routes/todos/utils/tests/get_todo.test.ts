import { getTodos, getTodosCount } from "../todo_utils";
import {vi, type Mock} from "vitest";
import { fetchTodoList } from "../api_utils";

vi.mock('../api_utils',()=>({
    fetchTodoList: vi.fn() //mock functions inside the module
}));

it('get todo list from api', async ()=>{
    //mock the api_utils module
    const mockData = [
        {"todo":"Creating project","status":"true","todoId":"0"},
        {"todo":"Wrting user journeys","status":"true","todoId":"1"},
        {"todo":"Deleting project","status":"true","todoId":"2"}
      ];

      // set mock return value for mock function
      (fetchTodoList as Mock).mockResolvedValue(mockData);

      var data = await getTodos(); // getTodos internally executes the mock
      expect(data).toEqual(mockData);
});


//mock the api_utils module
it('get todo list count from api', async ()=>{
    const mockData = [
        {"todo":"Creating project","status":"true","todoId":"0"},
        {"todo":"Wrting user journeys","status":"true","todoId":"1"},
        {"todo":"Deleting project","status":"true","todoId":"2"}
      ];
      // set mock return value for mock function
      (fetchTodoList as Mock).mockResolvedValue(mockData);

      var count = await getTodosCount(); // getTodosCount internally executes the mock 
      expect(count).toEqual(3);
});