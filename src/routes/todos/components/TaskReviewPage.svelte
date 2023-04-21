<script lang="ts">
  import { cleanTodo, isValidTodo } from "../utils/todo_utils";
  import Item from "./Item.svelte";

  let todo = "";
  let errorMessage: string | null = null;

  let tasksList = [
    { todo: "Creating project", status: true, todoId: 0 },
    { todo: "Add Tailwind", status: true, todoId: 1 },
    { todo: "Initialise base project", status: false, todoId: 2 },
  ];

  function addToList() {
    todo = cleanTodo(todo);
    if (!isValidTodo(todo)) {
      errorMessage = "Please enter a valid todo";
      return;
    }
    tasksList = [
      ...tasksList,
      { todo: todo, status: false, todoId: tasksList.length },
    ];
    todo = "";
    errorMessage = null;
  }

  function removeFromList(index: number) {
    tasksList.splice(index, 1);
    tasksList = tasksList;
  }

  function removeAll() {
    tasksList = [];
  }

  function onChange() {
    tasksList = tasksList;
  }

  $: todos = tasksList.filter((todo) => todo.status === false);
  $: done = tasksList.filter((todo) => todo.status === true);
</script>

<div class="bg-blue-600 w-full shadow-lg h-16">
  <h1 class="text-3xl font-bold text-center p-4 text-white">Todo App</h1>
</div>
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
      class=" rounded-lg h-8 text-white w-28"
      class:cursor-not-allowed={!tasksList.length}
      class:pointers-events-none={!tasksList.length}
      class:bg-red-300={!tasksList.length}
      class:bg-red-500={tasksList.length}
      disabled={!tasksList.length}
    >
      Remove All
    </button>
  </div>
  {#if errorMessage}
    <div class="text-red-500 text-md" data-testid="error-message">
      {errorMessage}
    </div>
  {:else}
    <div class="text-md">&nbsp;</div>
  {/if}
  {#if !tasksList.length}
    <div class="flex flex-col justify-around items-center m-8">
      <h2 class="text-gray-500 text-md text-center p-4">
        No todos to show!! Add now 👆
      </h2>
      <img
        src="/assets/take_notes.svg"
        alt="take-notes"
        data-testid="no-todo-image"
      />
    </div>
  {:else}
    <div class="flex flex-row mt-6 justify-between">
      <div class="flex flex-col w-full mx-2">
        <div class="mb-3">
          <h1 class="text-2xl font-bold">Todo List</h1>
        </div>
        <div class="overflow-y-scroll my-4">
          {#each todos as item, index}
            <Item {item} {removeFromList} {onChange} />
          {/each}
        </div>
      </div>
      <div class="flex flex-col w-full mx-2">
        <div class="mb-3">
          <h1 class="text-2xl font-bold">Done List</h1>
        </div>
        <div class="overflow-y-scroll my-4">
          {#each done as item, index}
            <Item {item} {removeFromList} {onChange} />
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
