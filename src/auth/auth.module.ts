import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { GoogleService } from './google/google.service';
import { GoogleStrategy } from './google/googleStrategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleSerializer } from './google/GoogleSerializer';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'google',
      session: true
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '2m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, GoogleStrategy, JwtStrategy, GoogleSerializer]
})
export class AuthModule { }
