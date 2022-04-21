import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { jwtGuard } from './auth/jwt/jwt.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @UseGuards(jwtGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
