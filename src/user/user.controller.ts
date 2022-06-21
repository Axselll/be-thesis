import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { jwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(jwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post()
  // create(@Body() user: CreateUserDto) {
  //   return this.userService.create(user);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.userService.findOne(_id);
  }
}
