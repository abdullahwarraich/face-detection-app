import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue'

// Defining routes for the application
const routes = [
  { path: "/", component: HelloWorld },
];

// Creating the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
