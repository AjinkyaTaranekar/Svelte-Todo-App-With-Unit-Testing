import { it, vi } from "vitest";
import { fetchTodoList } from "../api_utils";
const mockData = [
    {"todo":"Creating project","status":"true","todoId":"0"},
    {"todo":"Wrting user journeys","status":"true","todoId":"1"},
    {"todo":"Deleting project","status":"true","todoId":"2"}
  ];
//mock fetch api 
describe("test api utils module",()=>{
    it("fetchTodoList returns a todolist using fetch api",async ()=>{
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockData)
          });
        const result = await fetchTodoList();
        expect(result).toEqual(mockData);
    })
});