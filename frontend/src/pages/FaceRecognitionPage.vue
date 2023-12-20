<template>
    <div class="image-container">
        <div v-if="isAdminUser" class="user-statistics-section">
            <h3>User Statistics</h3>
            <!-- Table for displaying user statistics -->
            <table class="user-statistics-table small-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total Images Uploaded</th>
                        <th>Total Face Detected</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through user statistics and display in the table -->
                    <tr v-for="userStat in userStatistics" :key="userStat.user" class="user-statistics-row">
                        <td>{{ userStat.user }}</td>
                        <td>{{ userStat.totalImages }}</td>
                        <td>{{ userStat.totalDetectedFaces }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="upload-image-container">
            <h2>Upload an image to detect faces in the image</h2>
            <form @submit.prevent="processImage" class="upload-form">
                <label for="itemName">Item Name:</label>
                <input v-model="itemName" type="text" id="itemName" required>

                <!-- Input for uploading image -->
                <label for="image">Upload Image:</label>
                <input type="file" ref="imageInput" accept="image/*" @change="handleImageChange" required>

                <!-- Button to remove selected image -->
                <button type="button" @click="removeSelectedImage" v-if="selectedImage">Remove Selected Image</button>

                <!-- Button to submit the form and process the image -->
                <button type="submit">Submit</button>


                <!-- Use the Screen Loader component and pass the isLoading value -->
                <ScreenLoader :isLoading="isLoading" />
            </form>

            <!-- Display processed images for the logged-in user -->
            <div v-if="processedImages.length" class="processed-images-section">
                <h3>Processed Images List</h3>
                <!-- Table for displaying processed images -->
                <table class="processed-images-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>State</th>
                            <th>Thumbnail</th>
                            <th>Detected Faces</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loop through processed images and display in the table -->
                        <tr v-for="processedImage in processedImages" :key="processedImage.id" class="processed-image-row">
                            <td>{{ processedImage.itemName }}</td>
                            <td>{{ processedImage.processingState }}</td>
                            <td> <!-- Use a conditional statement to display the thumbnail or placeholder -->
                                <img v-if="processedImage.thumbnail !== '-'" :src="processedImage.thumbnail" alt="Thumbnail"
                                    class="thumbnail">
                                <span v-else>-</span>
                            </td>
                            <td>{{ processedImage.detectedFaces }}</td>
                            <td>
                                <!-- Button to remove the image -->
                                <button @click="removeProcessedImage(processedImage.id)"
                                    v-if="processedImage.processingState === 'Processed'" class="delete-button">
                                    Remove
                                </button>
                                <span v-else>-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>
  
<script>
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { removeDuplicatesById } from '@/utils/removeDuplicates';
import { createThumbnail } from '@/utils/thumbnailGenerator';
import ScreenLoader from '@/components/ScreenLoader.vue';

export default {
    components: {
        ScreenLoader
    },
    data() {
        return {
            itemName: '',
            selectedImage: null,
            currentUser: '',
            processedImages: [],
            userStatistics: [],
            isLoading: false,
        };
    },
    created() {
        const user = getLocalStorage('currentUser');
        this.currentUser = user;

        // Load values from local storage when the component is created
        this.loadValuesFromLocalStorage();

        // Load user statistics when the component is created
        this.getUserStatistics();
    },
    computed: {
        isAdminUser() {
            return this.currentUser === 'admin' && this.userStatistics.length > 0;
        }
    },
    methods: {
        // Method to handle process image for face detection
        async processImage() {
            try {
                this.isLoading = true;
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

                this.updateUserStatistics(this.currentUser, response.data.detectedFaces);
            } catch (error) {
                console.error('Image upload failed', error);
            } finally {
                // Call removeSelectedImage to clear the selected image
                this.removeSelectedImage();
                this.itemName = '';
                this.isLoading = false;
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
        // Method to remove a processed image from user list
        removeProcessedImage(id) {
            this.processedImages = this.processedImages.filter(image => image.id !== id);
            // Update local storage after deletion
            setLocalStorage('processedImages', this.processedImages);
        },
        // Method to load values from local storage when the component is created
        loadValuesFromLocalStorage() {
            const storedUserResponses = getLocalStorage('processedImages');

            if (storedUserResponses?.length) {
                const selectedUserResponses = storedUserResponses.filter(value => value.user === this.currentUser);
                this.processedImages = [...selectedUserResponses];
            }
        },
        // Method to update user statistics
        updateUserStatistics(user, detectedFaces) {
            const userStatIndex = this.userStatistics.findIndex(stat => stat.user === user);
            if (userStatIndex !== -1) {
                // User exists in statistics, update counts
                this.userStatistics[userStatIndex].totalImages += 1;
                this.userStatistics[userStatIndex].totalDetectedFaces += detectedFaces;
            } else {
                // User not found, add to statistics
                this.userStatistics.push({
                    user: user,
                    totalImages: 1,
                    totalDetectedFaces: detectedFaces,
                });
            }
            setLocalStorage('userStatistics', this.userStatistics);
        },
        getUserStatistics() {
            const storedUserStatistics = getLocalStorage('userStatistics');
            if (storedUserStatistics && storedUserStatistics.length) {
                this.userStatistics = storedUserStatistics;
            }
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

/* Styles for the processed images section */
.processed-images-section {
    margin-top: 20px;
}

.processed-images-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.processed-images-table th,
.processed-images-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.processed-image-row:hover {
    background-color: #f5f5f5;
}

.thumbnail {
    max-width: 50px;
    max-height: 50px;
}

.delete-button {
    background-color: red;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    /* Center the button */
}

.delete-button:hover {
    background-color: darkred;
}

/* Styles for the user statistics section */
.user-statistics-section {
    margin-top: 20px;
    text-align: center;
    /* Center the content */
}

.user-statistics-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.user-statistics-table th,
.user-statistics-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.user-statistics-row:hover {
    background-color: #f5f5f5;
}

.small-table {
    max-width: 400px;
    /* Set a maximum width for the table */
    margin: 0 auto;
    /* Center the table within its container */
}
</style>
  