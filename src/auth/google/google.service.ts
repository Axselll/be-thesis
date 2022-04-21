import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GoogleService {
    constructor(private userService: UserService) { }

    async findUser(user: User): Promise<User> {
        return this.userService.findByGoogleId(user.googleId);
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return this.userService.create(user);
    }
}
