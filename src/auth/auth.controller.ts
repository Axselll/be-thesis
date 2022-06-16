import { Controller, Get, UseGuards, HttpStatus, Req, Res } from '@nestjs/common';
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
  async googleAuthRedirect(@Res() res: any): Promise<any> {
    return res.redirect(process.env.ROUTE_TO_FE)
    // return res.json({ msg: 'sign success' })
  }

  @UseGuards(authenticatedGuard)
  @Get('user')
  async getLoggedInUser(@Req() req: any): Promise<any> {
    return this.authService.signIn(req.user as User)
  }
}