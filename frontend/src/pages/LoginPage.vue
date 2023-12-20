<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <label for="userName">User Name:</label>
      <input v-model="userName" type="text" id="userName" required>

      <button type="submit">Login</button>
    </form>
    <router-link to="/signup">Don't have an account? Sign Up</router-link>
  </div>
</template>
    
<script>
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage';

export default {
  data() {
    return {
      userName: '',
    };
  },
  methods: {
    async login() {
      try {
        // Check if the userName already exists in local storage
        const usersList = getLocalStorage('users') || [];
        const isUserAvailable = usersList.includes(this.userName);

        if (!isUserAvailable) {
          // Show alert if the userName does not match
          window.alert(`User doesn't exist; please go and create a new user.`);
          return;
        }

        // Making a POST request to the authentication endpoint
        const response = await this.$axios.post('/auth/login', { userName: this.userName });

        // Storing the authentication token and current user in localStorage
        setLocalStorage('authToken', response.data.accessToken);
        setLocalStorage('currentUser', this.userName);

      } catch (error) {
        // Handling and logging any errors that occur during login
        console.error('Login failed', error);
      }
    },
  },
};
</script>
  
<style scoped>
/* Styling for centering the login form within the viewport */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  /* Background color for the login container */
}

/* Styling for the login form */
.login-form {
  max-width: 300px;
  width: 100%;
  margin: 20px;
}

/* Styling for labels, input fields, and buttons */
label {
  display: block;
  margin-bottom: 8px;
}

input,
button {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  margin-bottom: 16px;
}

/* Styling for the login button */
button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>