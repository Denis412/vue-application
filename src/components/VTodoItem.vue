<template>
  <div class="content">
    <div class="columns is-mobile is-vcentered">
      <div class="column" :class="{ doneTodo: todo_item.done }">
        {{ todo_item.content }}
      </div>
      <div class="column is-5 has-text-right">
        <button
          @click="toggleDone"
          class="button"
          :class="todo_item.done ? 'is-success' : 'is-light'"
        >
          &check;
        </button>
        <button @click="deleteTodo" class="button is-danger ml-2">
          &cross;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    todo_item: {
      type: Object,
      default: () => ({}),
      require: true,
    },
  },

  setup({ todo_item }) {
    const store = useStore();
    return {
      toggleDone: (id) => store.commit("TOGGLE_DONE", todo_item.id),
      deleteTodo: (id) => store.commit("DELETE_TODO", todo_item.id),
    };
  },
};
</script>
