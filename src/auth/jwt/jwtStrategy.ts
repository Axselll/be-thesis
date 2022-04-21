import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type JwtPayload = { sub: string; email: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const extractJwtFromCookie = (req) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['jwt'];
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };

        super({
            jwtFromRequest: extractJwtFromCookie,
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    extractJwtFromCookie(req) {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }
        return token;
    }

    async validate(payload: JwtPayload) {
        return { googleId: payload.sub, email: payload.email };
    }
}