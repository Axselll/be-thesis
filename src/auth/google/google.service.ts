import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GoogleService {
    constructor(private userService: UserService) { }

    async findOrCreate(user: User): Promise<User> {
        return (await this.findUser(user)) || (await this.createUser(user));
    }

    private async findUser(user: User): Promise<User> {
        return this.userService.findByGoogleId(user.googleId);
    }

    private async createUser(user: User): Promise<User> {
        return this.userService.create(user);
    }
}
