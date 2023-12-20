<template>
    <div class="image-container">
        <div class="upload-image-container">
            <h2>Upload an image to detect faces in the image</h2>
            <form @submit.prevent="" class="upload-form">
                <label for="itemName">Item Name:</label>
                <input v-model="itemName" type="text" id="itemName" required>

                <label for="image">Upload Image:</label>
                <input type="file" ref="imageInput" accept="image/*" required>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {

    data() {
        return {
            itemName: '',
        };
    },

    methods: {
    },
};
</script>
  
<style scoped>
.image-container {
    position: relative;
}

/* Styles for the upload image container */
.upload-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.upload-form {
    max-width: 400px;
    width: 100%;
    margin: 20px;
}

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
  