<script lang="ts">
  export let item: { todo: string; status: boolean, todoId: number };
  export let removeFromList: (index: number) => void;
  export let onChange: () => void;

  $: status = item.status ? "done" : "todo"; 
</script>

<div
  class="flex flex-row justify-between items-center w-full my-2 border bg-gray-200 p-4"
>
  <input
    bind:checked={item.status}
    type="checkbox"
    class="h-4 w-4"
    data-testid="{status}-checkbox-{item.todoId}"
    on:change={onChange}
  />
  <span
    class:italic={item.status}
    class:font-semibold={item.status}
    data-testid="{status}-item-{item.todoId}"
    class="text-md"
  >
    {item.todo}
  </span>
  <button
    on:click={() => removeFromList(item.todoId)}
    data-testid="{status}-delete-button-{item.todoId}">❌</button
  >
</div>
