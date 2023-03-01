<template>
  <div class="card mb-5">
    <div class="card-content" :class="{'has-background-success-light': todo_item.completed}">
      <div class="content">
        <div class="columns is-mobile is-vcentered">
          <div class="column" :class="{doneTodo: todo_item.completed}">
            {{ todo_item.title }}
          </div>
          <div class="column is-5 has-text-right">
            <button @click="doneTodo" class="button" :class="todo_item.completed ? 'is-success' : 'is-light'">&check;</button>
            <button @click="deleteTodo" class="button is-danger ml-2">&cross;</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  props: {
    todo_item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const store = useStore();

    return {
      doneTodo: store.commit('doneTodo', props.todo_item.id),
      deleteTodo: store.commit('deleteTodo', props.todo_item.id),
    };
  }
}
</script>
