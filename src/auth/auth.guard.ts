import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from '../services/prisma';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma:PrismaService,private readonly jwtService:JwtService, private readonly configService:ConfigService){

  }
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if(!token){
      // throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("JWT_SECRET")
      }) as {
        sub:string;
        name:string;
        email:string
      }
      const foundUser = await this.prisma.users.findUnique({
        where: {
          id: payload.sub
        }
      })
      
      if(!foundUser){
        throw new UnauthorizedException()
      }
      request["user"] = payload
    } 
    catch  {
      throw new UnauthorizedException()
    }
    return true
  }
  private extractTokenFromHeader(req:Request){
    const {authorization} = req.headers
    if(!authorization){
      throw new UnauthorizedException()
    }
    const [type, token] = authorization.split(" ")
    return type === "Bearer" ? token : undefined
  }
}
