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
import { query, orderBy, limit } from "firebase/firestore";

export default createStore({
  actions: {
    async FETCH_TODOS({ commit, getters }) {
      const collectionQuery = query(
        getters.COLLECTION_REF,
        orderBy("date", "desc")
      );

      try {
        await onSnapshot(collectionQuery, (querySnapshot) => {
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
      } catch (e) {
        console.log(e.message);
      }
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
