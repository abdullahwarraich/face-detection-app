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
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { removeDuplicatesById } from '@/utils/removeDuplicates';
import { createThumbnail } from '@/utils/thumbnailGenerator';

export default {
    data() {
        return {
            itemName: '',
            selectedImage: null,
            currentUser: '',
            processedImages: [],
        };
    },
    created() {
        const user = getLocalStorage('currentUser');
        this.currentUser = user;
    },
    methods: {
        // Method to handle process image for face detection
        async processImage() {
            try {
                const authToken = getLocalStorage('authToken');
                const imageInput = this.$refs.imageInput;
                const formData = new FormData();
                formData.append('file', imageInput.files[0]);
                formData.append('username', this.currentUser);

                // Add the image to the processing state
                const processingImage = { id: uuidv4(), user: this.currentUser, itemName: this.itemName, thumbnail: '-', processingState: 'In Progress', detectedFaces: '-' };
                this.processedImages.push(processingImage);

                // Make API request to prcocess image
                const response = await this.$axios.post('/faceDetection', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                // Create a thumbnail
                const thumbnail = await createThumbnail(imageInput.files[0]);
                
                // Update the processing state to 'Processed' after a delay
                setTimeout(() => {
                    const index = this.processedImages.findIndex(img => img.id === processingImage.id);
                    if (index !== -1) {
                        // Update the processing state to 'Processed'
                        this.processedImages[index].processingState = 'Processed';
                        this.processedImages[index] = { ...this.processedImages[index], ...response.data, thumbnail: thumbnail };

                        const storedUserResponses = getLocalStorage('processedImages');
                        if (storedUserResponses && storedUserResponses.length) {
                            setLocalStorage('processedImages', removeDuplicatesById([...this.processedImages, ...storedUserResponses]));
                        } else {
                            setLocalStorage('processedImages', removeDuplicatesById([...this.processedImages]));
                        }
                    }
                }, 5000);

            } catch (error) {
                console.error('Image upload failed', error);
            } finally {
                // Call removeSelectedImage to clear the selected image
                this.removeSelectedImage();
                this.itemName = '';
            }
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
  