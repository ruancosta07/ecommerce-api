import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../services/prisma';
import { UsersModule } from '../users/users.module';
import { NodemailerService } from 'src/utils/nodemailer';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async(configService:ConfigService)=> ({
      secret: configService.get("JWT_SECRET"),
      signOptions: {
        expiresIn: +configService.get<number>("JWT_EXPIRATION_TIME") * 12,
        algorithm: "HS512"
      }
    }),
    inject: [ConfigService]
  }),
  UsersModule
],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, NodemailerService],
})
export class AuthModule {}
