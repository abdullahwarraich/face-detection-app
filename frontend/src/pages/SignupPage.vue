<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="signup" class="signup-form">
            <label for="userName">User Name:</label>
            <input v-model="userName" type="text" id="userName" required>
            <button type="submit">Sign Up</button>
        </form>
        <router-link to="/">Already have an account? Log In</router-link>
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
        async signup() {
            try {
                // Check if the username already exists in local storage
                const usersList = getLocalStorage('users') || [];
                const isUserAvailable = usersList.includes(this.userName);
                
                if (isUserAvailable) {
                    // Show alert if the username already exists
                    window.alert('Username already exists. Please choose a different username.');
                    return;
                }

                // Add the new username to the list of users in local storage
                setLocalStorage('users', [
                    ...usersList,
                    this.userName,
                ]);

                // Making a POST request to the authentication endpoint
                const response = await this.$axios.post('/auth/login', { username: this.userName });

                // Storing the authentication token and current user in localStorage
                setLocalStorage('authToken', response.data.accessToken);
                setLocalStorage('currentUser', this.userName);

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
/* Styling for centering the sign-up form within the viewport */
.signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
}

/* Styling for the sign-up form */
.signup-form {
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