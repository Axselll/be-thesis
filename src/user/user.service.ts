import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(user: User): Promise<User> {
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

  async update(_id: string, user: User): Promise<User> {
    await this.userModel.updateOne({ _id }, user).exec();
    return await this.findOne(_id);
  }

  async remove(_id: string) {
    return await this.userModel.deleteOne({ _id }).exec();
  }
}
