import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/LoginPage.vue";
import SignUp from "@/pages/SignupPage.vue";
import FaceRecognition from "@/pages/FaceRecognitionPage.vue";

// Defining routes for the application
const routes = [
  { path: "/", component: Login },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/face-recognition",
    name: "face-recognition",
    component: FaceRecognition,
  },
];

// Creating the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
