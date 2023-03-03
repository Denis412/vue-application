import { createStore } from "vuex";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export default createStore({
  actions: {
    FETCH_TODOS({ commit, getters }) {
      onSnapshot(getters.COLLECTION_REF, (querySnapshot) => {
        const fbTodos = [];
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done,
          };
          fbTodos.push(todo);
        });
        commit("UPDATE_TODOS", fbTodos);
      });
    },
  },
  mutations: {
    UPDATE_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      addDoc(state.collectionRef, todo);
    },
    DELETE_TODO(state, id) {
      deleteDoc(doc(state.collectionRef, id));
    },
    TOGGLE_DONE(state, id) {
      const todo = state.todos.find((todo) => todo.id === id);

      updateDoc(doc(state.collectionRef, id), {
        done: !todo.done,
      });
    },
  },
  state: {
    todos: [],
    collectionRef: collection(db, "todos"),
  },
  getters: {
    ALL_TODOS(state) {
      return state.todos;
    },
    COLLECTION_REF(state) {
      return state.collectionRef;
    },
  },
});
