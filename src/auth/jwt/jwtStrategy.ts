import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as env from 'dotenv'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'joemama'
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
