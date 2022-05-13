import { Module } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { CommitService } from './commit.service';
import { CommitController } from './commit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './files'
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [CommitController],
  providers: [CommitService]
})
export class CommitModule { }
