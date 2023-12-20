<template>
    <div class="image-container">
        <div class="upload-image-container">
            <h2>Upload an image to detect faces in the image</h2>
            <form @submit.prevent="processImage" class="upload-form">
                <label for="itemName">Item Name:</label>
                <input v-model="itemName" type="text" id="itemName" required>

                <label for="image">Upload Image:</label>
                <input type="file" ref="imageInput" accept="image/*" @change="handleImageChange" required>

                <button type="button" @click="removeSelectedImage" v-if="selectedImage">Remove Selected Image</button>

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
            selectedImage: null,
        };
    },

    methods: {
        // Method to handle process image for face detection
        async processImage() {
        },
        // Method to handle image change in the input
        handleImageChange() {
            // Update the selectedImage when the input file changes
            const imageInput = this.$refs.imageInput;
            this.selectedImage = imageInput.files[0];
        },
        // Method to remove the selected image
        removeSelectedImage() {
            this.selectedImage = null;
            // Clear the file input to allow selecting the same file again
            this.$refs.imageInput.value = '';
        },
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
  