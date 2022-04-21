import { Controller, Get, UseGuards, HttpStatus, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { googleGuard } from './google/google.guard';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }

  @UseGuards(googleGuard)
  @Get('google')
  async googleAuth(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @UseGuards(googleGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: Request): Promise<any> {
    return this.authService.signIn(req.user as User)
  }
}
