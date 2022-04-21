import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.userService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() user: User) {
    return this.userService.update(_id, user);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.userService.remove(_id);
  }
}
