import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/schema/user.schema';
import { GoogleService } from './google.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private googleService: GoogleService) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        createProfile: CreateUserDto,
    ): Promise<any> {
        const user = this.profileToUser(profile);
        const newUser = Object.assign(user, createProfile)
        return (await this.googleService.findUser(user) || this.googleService.createUser(newUser))
    }

    private profileToUser(profile: Profile): User {
        return {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
        } as User;
    }
}
