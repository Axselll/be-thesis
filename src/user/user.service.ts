import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(user: CreateUserDto): Promise<User> {
    return await new this.userModel(user).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async findByGoogleId(googleId: string): Promise<User> {
    return await this.userModel.findOne({ googleId }).exec();
  }
}
