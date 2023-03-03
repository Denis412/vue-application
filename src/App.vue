<template>
  <div class="wrapper-todo">
    <div class="title has-text-centered has-text-white">My ToDo List</div>
    <VForm />
    <VTodoList />
  </div>
</template>

<script setup>
import VForm from "@/components/VForm.vue";
import VTodoList from "@/components/VTodoList.vue";
</script>

<style>
@import "bulma/css/bulma.min.css";

.wrapper-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
