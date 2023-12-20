import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import {
  PAT,
  USER_ID,
  APP_ID,
  MODEL_ID,
  MODEL_VERSION_ID,
  CLARIFAI_API_URL,
} from '../../utils/constants';

const REQUEST_URL = `${CLARIFAI_API_URL}${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;

@Injectable()
export class FaceDetectionService {
  constructor() {}

  // Method for performing face recognition using Clarifai API
  async faceRecognition(params: { userName: string; file: string }) {
    try {
      // Read the content of the image file
      const data = await fs.readFile(params.file);
      // Convert the image data to base64 format
      const base64Image = Buffer.from(data).toString('base64');

      // Prepare the request payload in the required format
      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                // "url": base64Image
                base64: base64Image,
              },
            },
          },
        ],
      });

      // Set up the options for making a POST request to Clarifai API
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Key ' + PAT,
        },
        body: raw,
      };

      // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
      // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
      // this will default to the latest version_id

      // Make the request to Clarifai API for face detection
      const response = await fetch(REQUEST_URL, requestOptions);
      const result = await response.json();
      
      // Extract information about detected faces from the API response
      const regions = result.outputs[0].data.regions;

      return {
        detectedFaces: regions?.length || 0,
      };
    } catch (error) {
      console.log('error', error);
      throw new Error(error?.message);
    }
  }
}
