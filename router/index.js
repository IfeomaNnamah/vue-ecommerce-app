import {createRouter, createWebHistory } from 'vue-router'
import index from "../views/Index.vue"
import products from "../views/SearchProducts.vue"
import cart from "../views/ShoppingCart.vue"

const routes = [
    {
        path: '/index',
        component: index
    },

    {
        path: '/products',
        component: products
    },

    {
        path: '/cart',
        component: cart
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router