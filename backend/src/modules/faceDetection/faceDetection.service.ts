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

  async faceRecognition(params: { userName: string; file: string }) {
    try {
      const data = await fs.readFile(params.file);
      const base64Image = Buffer.from(data).toString('base64');

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

      const response = await fetch(REQUEST_URL, requestOptions);
      const result = await response.json();
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
