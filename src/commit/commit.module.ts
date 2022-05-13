import { Module } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { CommitService } from './commit.service';
import { CommitController } from './commit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    // MulterModule.register({
    //   dest: './files'
    // }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [CommitController],
  providers: [CommitService]
})
export class CommitModule { }
