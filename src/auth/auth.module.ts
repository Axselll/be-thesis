import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { GoogleService } from './google/google.service';
import { GoogleStrategy } from './google/googleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule, JwtAuthModule,
    // JwtModule.register({
    //   secret: process.env.SECRET_KEY,
    //   signOptions: { expiresIn: '2m' }
    // })
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, GoogleStrategy]
})
export class AuthModule { }
