import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      products: [],
      cart: [],
      total_ammount: ''
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
    setTotalAmount(state, data){
      state.total_ammount = data
    },
  }
});

export default store;