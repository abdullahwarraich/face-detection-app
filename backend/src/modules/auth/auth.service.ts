import { Injectable } from '@nestjs/common';
import { JwtService } from '../../services/jwt.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  protected validateUser(input: { userName: string }) {
    return { userName: input.userName };
  }

  login(user: { userName: string }) {
    const payload = this.validateUser(user);
    const accessToken = this.jwtService.generateToken(payload);
    return {
      accessToken,
    };
  }
}
