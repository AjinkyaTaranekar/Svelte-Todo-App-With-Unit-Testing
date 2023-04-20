<script lang="ts">
  import TodoItem from "./TodoItem.svelte";

  let todo = "";

  let todoList = [
    { todo: "Creating project", status: true },
    { todo: "Add Tailwind", status: true },
    { todo: "Initialise base project", status: false },
  ];

  function removeFromList(index: number) {}
</script>

<div class="flex flex-col p-4">
  <div class="mt-6 mb-3">
    <h1 class="todo-2xl font-bold">Todo List</h1>
  </div>
  <div class="overflow-y-scroll my-4">
    {#each todoList as item, index}
      <TodoItem {item} {index} {removeFromList} />
    {/each}
  </div>
</div>
