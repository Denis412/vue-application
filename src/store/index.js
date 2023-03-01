import { createStore } from "vuex";

export default createStore({
    actions: {
        fetchTodos({ commit }, limit = 3) {
            fetch("https://jsonplaceholder.typicode.com/todos?_limit=" + limit)
                .then(resolve => resolve.json())
                .then(todos => commit('updateTodos', todos))
                .catch(e => console.log(e))
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.unshift(todo);
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        doneTodo(state, id) {
          const todoElement = state.todos.find(todo => todo.id === id);
            //todoElement.completed = !todoElement.completed;
        },
        updateTodos(state, todos) {
            state.todos = todos;
        }
    },
    state: {
        todos: [
            {
                id: 1,
                title: "hello",
                completed: false,
            }
        ],
    },
    getters: {
        allTodos(state) {
            return state.todos;
        }
    },
});
