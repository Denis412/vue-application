<template>
  <form @submit.prevent="addTodo">
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <VInput v-model.capitalize="newTodoContent" />
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
import VInput from "@/components/VInput.vue";

const store = useStore();
const newTodoContent = ref("");

const addTodo = () => {
  store.commit("ADD_TODO", {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });

  newTodoContent.value = "";
};
</script>
