import { Controller, Get, UseGuards, HttpStatus, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { googleGuard } from './google/google.guard';
import { JwtAuthService } from './jwt/jwt.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService) { }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken);
    return this.authService.signIn(req.user as User)
  }
}
