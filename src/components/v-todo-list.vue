<template>
  <div class="v-todo-list">
    <VTodoItem
        v-for="todo in todos"
        :todo_item="todo"
        :key="todo.id"
    />
  </div>
</template>

<script>
//import
import {computed, onMounted } from "vue";
import {useStore} from "vuex";
import VTodoItem from "@/components/v-todo-item.vue";

export default {
  components: { VTodoItem },
  setup() {
    const store = useStore();

    onMounted(() => store.dispatch('fetchTodos', 5));

    return {
      todos: computed(() => store.getters.allTodos),
    }
  }
}
</script>

<style></style>