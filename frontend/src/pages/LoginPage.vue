<template>
  <div class="auth-form-container">
    <h2>Login</h2>
    <AuthForm :buttonText="'Login'" :redirectText="'Don\'t have an account? Sign Up'" :redirectLink="'/signup'"
      :handleSubmit="login" />
  </div>
</template>
    
<script>
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage';
import AuthForm from '@/components/AuthForm';

export default {
  components: {
    AuthForm,
  },
  methods: {
    async login(userName) {
      try {
        // Check if the userName already exists in local storage
        const usersList = getLocalStorage('users') || [];
        const isUserAvailable = usersList.includes(userName);

        if (!isUserAvailable) {
          // Show alert if the userName does not match
          window.alert(`User doesn't exist; please go and create a new user.`);
          return;
        }

        // Making a POST request to the authentication endpoint
        const response = await this.$axios.post('/auth/login', { userName: userName });

        // Storing the authentication token and current user in localStorage
        setLocalStorage('authToken', response.data.accessToken);
        setLocalStorage('currentUser', userName);

        // Redirecting to the next page on successful login
        this.$router.push('/face-recognition');
      } catch (error) {
        // Handling and logging any errors that occur during login
        console.error('Login failed', error);
      }
    },
  },
};
</script>

<style scoped>
.auth-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>