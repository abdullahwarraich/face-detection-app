<template>
    <form @submit.prevent="submitForm" class="auth-form">
        <label for="userName">User Name:</label>
        <input v-model="userName" type="text" id="userName" required>
        <button type="submit">{{ buttonText }}</button>
    </form>
    <router-link :to="redirectLink">{{ redirectText }}</router-link>
</template>
  
<script>
export default {
    props: {
        buttonText: String,
        redirectText: String,
        redirectLink: String,
        // New prop to pass userName to parent component
        handleSubmit: Function,
    },
    data() {
        return {
            userName: '',
        };
    },
    methods: {
        async submitForm() {
            await this.handleSubmit(this.userName);
        },
    },
};
</script>
  
<style scoped>
/* Styling for the form */
.auth-form {
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

/* Styling for buttons */
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
  