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
import {onMounted, ref} from "vue";
import { db } from "@/firebase"
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

// firebase ref

const todosCollectionRef = collection(db, 'todos');

//todo

const todos = ref([]);

// get todos

onMounted(() => {
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });

})

//addTodo

const newTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
  });

  newTodoContent.value = "";
}

//deleteTodo

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
}

//doneTodo

const doneTodo = (id) => {
  const todoElement = todos.value.find(todo => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todoElement.done,
  });

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