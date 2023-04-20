<script lang="ts">
  import { cleanTodo, isValidTodo } from "../utils/todo_utils";
  import TodoItem from "./TodoItem.svelte";

  let todo = "";
  let errorMessage: string | null = null;

  let todoList = [
    { todo: "Creating project", status: true },
    { todo: "Add Tailwind", status: true },
    { todo: "Initialise base project", status: false },
  ];

  function addToList() {
    todo = cleanTodo(todo);
    if (!isValidTodo(todo)) {
      errorMessage = "Please enter a valid todo";
      return;
    }
    todoList = [...todoList, { todo: todo, status: false }];
    todo = "";
    errorMessage = null;
  }

  function removeFromList(index: number) {
    todoList.splice(index, 1);
    todoList = todoList;
  }

  function removeAll() {
    todoList = [];
  }
</script>

<div class="flex flex-col p-4 w-full">
  <div class="flex flex-row justify-between items-center">
    <input
      bind:value={todo}
      type="todo"
      on:keydown={(event) => {
        if (event.key === "Enter") {
          addToList();
        }
      }}
      placeholder="What needs to be done?"
      class="border-2 rounded-lg border-blue-500 h-12 placeholder:todo-lg p-2 w-full"
    />
    <button
      on:click={addToList}
      class="bg-blue-500 rounded-lg h-8 text-white w-16 mx-2"
    >
      Add
    </button>
    <button
      on:click={removeAll}
      class=" rounded-lg h-8 text-white w-20 mx-2"
      class:cursor-not-allowed={!todoList.length}
      class:pointers-events-none={!todoList.length}
      class:bg-red-300={!todoList.length}
      class:bg-red-500={todoList.length}
      disabled={!todoList.length}
    >
      Remove
    </button>
  </div>
  {#if errorMessage}
    <div class="text-red-500 text-md">{errorMessage}</div>
  {/if}
  {#if !todoList.length}
    <div class="text-gray-500 text-md text-center m-8">
      No todos to show!! Add now 👆
    </div>
  {:else}
    <div class="mt-6 mb-3">
      <h1 class="text-2xl font-bold">Todo List</h1>
    </div>
    <div class="overflow-y-scroll my-4">
      {#each todoList as item, index}
        <TodoItem {item} {index} {removeFromList} />
      {/each}
    </div>
  {/if}
</div>
