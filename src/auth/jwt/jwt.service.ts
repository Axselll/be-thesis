import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/user/schema/user.schema';
import { JwtPayload } from './jwtStrategy';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) { }

    login(user) {
        const payload: JwtPayload = { email: user.email, sub: user.googleId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}