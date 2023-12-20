import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FaceDetectionModule } from './modules/faceDetection/faceDetection.module';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
@Module({
  imports: [AuthModule, FaceDetectionModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('faceDetection');
  }
}
