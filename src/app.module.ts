import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from './repository/repository.module';
import { CommitModule } from './commit/commit.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.PROD_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }),
    RepositoryModule,
    CommitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
