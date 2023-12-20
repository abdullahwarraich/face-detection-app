import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FaceDetectionController } from './faceDetection.controller';
import { FaceDetectionService } from './faceDetection.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './assets/images',
      }),
    }),
  ],
  controllers: [FaceDetectionController],
  providers: [FaceDetectionService],
})
export class FaceDetectionModule {}
