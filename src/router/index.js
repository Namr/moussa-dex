import { createRouter, createWebHistory } from 'vue-router'

import Main from '../views/Main'
import Reader from '../views/Reader'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/reader/:id',
        name: "Reader",
        component: Reader
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes,
})

export default router