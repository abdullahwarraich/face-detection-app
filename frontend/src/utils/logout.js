import { removeLocalStorage } from "./localStorage";
export function logout(router) {
  // Clear the access token and current user from local storage
  removeLocalStorage("authToken");
  removeLocalStorage("currentUser");
  // Redirect to the login page
  router.push("/");
}
