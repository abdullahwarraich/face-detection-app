import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

// these values should be in .env file
const JWT_SECRET_KEY = 'yourSecretKey';
const JWT_EXPIRY = 1800 * 60;

@Injectable()
export class JwtService {
  private readonly secretKey: string = JWT_SECRET_KEY;

  generateToken(payload: any): string {
    return sign(payload, this.secretKey, { expiresIn: JWT_EXPIRY });
  }

  verifyToken(token: string): any {
    try {
      return verify(token, this.secretKey);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
