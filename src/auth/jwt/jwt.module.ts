import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from './jwt.service';
import { JwtAuthStrategy } from './jwtStrategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '2m' }
        })],
    providers: [JwtAuthStrategy, JwtAuthService],
    exports: [JwtModule, JwtAuthService]
})

export class JwtAuthModule { }