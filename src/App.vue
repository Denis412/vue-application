<template>
  <div class="wrapper-todo">

    <div class="title has-text-centered has-text-white">
      My ToDo List
    </div>
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

    <div v-for="todo in todos" :key="todo.id" class="card mb-5">
      <div class="card-content" :class="{'has-background-success-light': todo.done}">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{doneTodo: todo.done}">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button @click="doneTodo(todo.id)" class="button" :class="todo.done ? 'is-success' : 'is-light'">&check;</button>
              <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">&cross;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

//todo

const todos = ref([]);

//addTodo

const newTodoContent = ref("");

const addTodo = () => {
  todos.value.unshift({
    id: uuidv4(),
    content: newTodoContent.value,
    done: false,
  });

  newTodoContent.value = "";
}

//deleteTodo

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
}

//doneTodo

const doneTodo = (id) => {
  const todoElement = todos.value.find(todo => todo.id === id);
  todoElement.done = !todoElement.done;
}
</script>

<style>
@import 'bulma/css/bulma.min.css';

.wrapper-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.doneTodo {
  text-decoration: line-through;
}
</style>