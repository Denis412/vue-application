<template>
  <form @submit.prevent="addTodo">
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          v-model="newTodoContent"
          placeholder="Add a todo"
        />
      </p>
      <p class="control">
        <button :disabled="!newTodoContent" class="button is-info">Add</button>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const newTodoContent = ref("");

const addTodo = () => {
  store.commit("ADD_TODO", {
    content: newTodoContent.value,
    done: false,
  });

  newTodoContent.value = "";
};
</script>
