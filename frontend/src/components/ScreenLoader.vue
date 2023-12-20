<template>
    <div v-if="isLoading" class="processing-overlay">
        <div class="processing-spinner"></div>
        <div class="processing-text">Processing...</div>
    </div>
</template>
  
<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.processing-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    /* semi-transparent white background */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    /* ensure it's on top of other elements */
}

.processing-spinner {
    border: 8px solid #3498db;
    /* blue border */
    border-top: 8px solid #f3f3f3;
    /* transparent border on top */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
}

.processing-text {
    font-size: 18px;
    color: #333;
    /* dark text color */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  