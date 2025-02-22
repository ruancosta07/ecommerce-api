import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../services/prisma';
import { compare } from "bcrypt"
import { UserDto } from '../users/users.dto';
import { AuthDto } from './auth.dto';
import { Request } from 'express';
@Injectable()
export class AuthService {
    private jwtExpirationTime: number;
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly prisma: PrismaService,) {
        this.jwtExpirationTime = +this.configService.get("JWT_EXPIRATION_TIME") * 12
    }
    async login(email: string, password: string):Promise<{user:UserDto} & AuthDto> {
        const [foundUser, userWithPassword] = await Promise.all( [
                this.prisma.users.findFirst({ where: { email },omit: { password: true, twoStepsAuthCode: true, } }), 
                this.prisma.users.findFirst({ where: { email } })
            ])
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        const passwordMatch = await compare(password, userWithPassword.password)
        if (!passwordMatch) {
            throw new UnauthorizedException()
        }
        const payload = {
            sub: foundUser.id,
            email: foundUser.email,
            name: foundUser.name
        }
        const token = this.jwtService.sign(payload)
        return { token, expiresIn: this.jwtExpirationTime, user:foundUser }
    }
    async verifyUser(req:Request){
        const {authorization} = req.headers
        if(!authorization){
            throw new UnauthorizedException()
        }
        const token = authorization.split(" ")[1]
        if(!token){
            throw new UnauthorizedException()
        }
        try {
           const decodedToken = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get("JWT_SECRET")
            }) as {
                sub:string;
                email:string;
                name:string
            }
            const foundUser = await this.prisma.users.findUnique({
                where: {
                    id:decodedToken.sub
                },
                omit: {
                    password:true,
                    twoStepsAuthCode:true,
                },
                
            })

            return {...foundUser}
        } catch{
            throw new UnauthorizedException()
        }

    }
}
