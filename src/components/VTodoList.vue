<template>
  <div v-for="todo in todos" :key="todo.id" class="card mb-5">
    <div
      class="card-content"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <VTodoItem :todo_item="todo" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import VTodoItem from "@/components/VTodoItem.vue";

const store = useStore();
const todos = computed(() => store.getters.ALL_TODOS);

onMounted(() => store.dispatch("FETCH_TODOS"));
</script>
