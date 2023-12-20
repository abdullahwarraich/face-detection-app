import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import { extname } from 'path';
import { FaceDetectionService } from './faceDetection.service';

@Controller('faceDetection')
export class FaceDetectionController {
  constructor(private readonly faceDetectionService: FaceDetectionService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/images', // specify the upload directory
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix + extension);
        },
      }),
    }),
  )
  async createUser(
    @Body() params: { userName: string },
    @UploadedFile() file: Multer.File,
  ) {
    const values = {
      userName: params.userName,
      file: file.path,
    };
    return this.faceDetectionService.faceRecognition(values);
  }
}
