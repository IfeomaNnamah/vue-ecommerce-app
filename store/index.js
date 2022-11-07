import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      products: [],
      cart: []
    };
  },
  getters: {
    tasks: (state) => state.tasks,
  },
  plugins: [
    createPersistedState()
  ],
  mutations :{
    updateCart(state, data){
      state.cart.push(data)
    },
    setCart(state, data){
      state.cart = data
    },
    setProducts(state, data){
      state.products = data
    },
  }
});

export default store;