import { Controller, Get, UseGuards, HttpStatus, Req, Res, Next } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { googleGuard } from './google/google.guard';
import { authenticatedGuard } from './google/isAuthenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) { }

  @UseGuards(googleGuard)
  @Get('google')
  async googleAuth(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @UseGuards(googleGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: Request): Promise<any> {
    return {
      msg: 'logged in',
      user: req.user
    }
    // return this.authService.signIn(req.user as User)
    // const response = await this.authService.signIn(req.user as User)
    // await res.status(HttpStatus.OK).json(response)
    // console.log(response);
    // return res.redirect(process.env.ROUTE_TO_FE)
  }

  @UseGuards(authenticatedGuard)
  @Get('user')
  async getLoggedInUser(@Req() req): Promise<any> {
    return this.authService.signIn(req.user as User)
  }
}