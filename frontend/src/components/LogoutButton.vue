<template>
    <button class="logout-button" @click="logout">Logout</button>
</template>
  
<script>
import { logout as logoutUtil } from '@/utils/logout';

export default {
    methods: {
        logout() {
            // Call the logout utility function with the router instance
            logoutUtil(this.$router);
        },
    },
};
</script>
  
<style scoped>
/* Styling for the logout button */
.logout-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    position: fixed;
    top: 10px;
    right: 10px;
    width: auto;
}

/* Hover effect for the logout button */
.logout-button:hover {
    background-color: #bd2130;
}
</style>
  