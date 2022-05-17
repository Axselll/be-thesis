import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async signIn(user: User): Promise<any> {
    return {
      loggedInUser: user,
      access_token: this.jwtService.sign({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
      })
    }
  }
}
