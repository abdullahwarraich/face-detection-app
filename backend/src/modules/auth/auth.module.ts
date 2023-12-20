import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '../../services/jwt.service';

@Module({
  imports: [],
  providers: [JwtService, AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
