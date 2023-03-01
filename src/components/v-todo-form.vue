<template>
  <form @submit.prevent="addTodo">
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input class="input" type="text" v-model="newTodoContent" placeholder="Add a todo">
      </p>
      <p class="control">
        <button :disabled="!newTodoContent" class="button is-info">Add</button>
      </p>
    </div>
  </form>
</template>

<script setup>
import {useStore} from "vuex";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const store = useStore();
const newTodoContent = ref('');

const addTodo = store.commit('addTodo', {
  userId: 1,
  id: uuidv4(),
  title: newTodoContent.value,
  competed: false,
});
</script>