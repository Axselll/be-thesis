import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleSerializer extends PassportSerializer {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { super() }

    serializeUser(user: User, done: CallableFunction) {
        done(null, user.googleId)
    }

    async deserializeUser(googleId: string, done: CallableFunction) {
        return await this.userService.findByGoogleId(googleId)
            .then(user => done(null, user))
            .catch(err => done(err))
    }
}