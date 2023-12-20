import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FaceDetectionModule } from './modules/faceDetection/faceDetection.module';
@Module({
  imports: [AuthModule, FaceDetectionModule],
})
export class AppModule {}
