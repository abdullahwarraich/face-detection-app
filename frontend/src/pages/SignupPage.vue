<template>
    <div class="auth-form-container">
        <h2>Sign Up</h2>
        <AuthForm :buttonText="'Sign Up'" :redirectText="'Already have an account? Log In'" :redirectLink="'/'"
            :handleSubmit="signup" />
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
        async signup(userName) {
            try {
                // Check if the username already exists in local storage
                const usersList = getLocalStorage('users') || [];
                const isUserAvailable = usersList.includes(userName);

                if (isUserAvailable) {
                    // Show alert if the username already exists
                    window.alert('Username already exists. Please choose a different username.');
                    return;
                }

                // Add the new username to the list of users in local storage
                setLocalStorage('users', [
                    ...usersList,
                    userName,
                ]);

                // Making a POST request to the authentication endpoint
                const response = await this.$axios.post('/auth/login', { username: userName });

                // Storing the authentication token and current user in localStorage
                setLocalStorage('authToken', response.data.accessToken);
                setLocalStorage('currentUser', userName);

                // Redirecting to the next page on successful login
                this.$router.push('/face-recognition');
            } catch (error) {
                // Handling and logging any errors that occur during sign-up
                console.error('Sign Up failed', error);
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