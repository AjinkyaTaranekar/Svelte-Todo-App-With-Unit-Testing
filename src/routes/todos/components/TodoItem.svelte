<script lang="ts">
  export let item: { todo: string; status: boolean };
  export let index: number;
  export let removeFromList: (index: number) => void;
</script>

<div
  class="flex flex-row justify-between items-center w-full my-2 border bg-gray-200 p-4"
>
  <input
    bind:checked={item.status}
    type="checkbox"
    class="h-4 w-4"
    data-testid="checkbox-{index}"
  />
  <span
    class:checked={item.status}
    class:line-through={item.status}
    class:italic={item.status}
    class:font-semibold={item.status}
    data-testid="todo-item-{index}"
    class="todo-md"
  >
    {item.todo}</span
  >
  <button
    on:click={() => removeFromList(index)}
    data-testid="delete-button-{index}">❌</button
  >
</div>
