import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../services/prisma';
import { compare } from "bcrypt"
import { UserDto } from '../users/users.dto';
import { AuthDto } from './auth.dto';
import { Request } from 'express';
import { NodemailerService } from 'src/utils/nodemailer';
@Injectable()
export class AuthService {
    private jwtExpirationTime: number;
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly prisma: PrismaService, private readonly nodemailer:NodemailerService) {
        this.jwtExpirationTime = +this.configService.get("JWT_EXPIRATION_TIME") * 12
    }
    async login(email: string, password: string, twoStepsAuthCode:string):Promise<{user:UserDto} & AuthDto | {twoStepsAuth:boolean}> {
        const [foundUser, userWithPassword] = await Promise.all( [
                this.prisma.users.findFirst({ where: { email, },
                    omit: { password: true, twoStepsAuthCode: true, } }), 
                this.prisma.users.findFirst({ where: { email } })
            ])
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        const passwordMatch = await compare(password, userWithPassword.password)
        if(foundUser.twoStepsAuth && !twoStepsAuthCode){
            const uuid = crypto.randomUUID()
            const singleCode = uuid.split("-")[uuid.split("-").length - 1].toUpperCase().slice(0,6)
            await Promise.all([
                await this.nodemailer.sendMailToUser(email, "Código de verificação em duas etapas", `<h1>${singleCode}</h1>`), 
                this.prisma.users.update({where: {id:foundUser.id}, data: {
                twoStepsAuthCode:singleCode,
                twoStepsAuthExpiresAt: Date.now() + 15 * 60*1000
            }})
        ])
            return {twoStepsAuth:true}
        }
        else if(foundUser.twoStepsAuth && twoStepsAuthCode){
            if(twoStepsAuthCode !== userWithPassword.twoStepsAuthCode){
                throw new UnauthorizedException()
            }
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name
            }
            const token = this.jwtService.sign(payload)
            return { token, expiresIn: this.jwtExpirationTime, user:foundUser,}
        }
        if (!passwordMatch) {
            throw new UnauthorizedException()
        }
        const payload = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name
        }
        const token = this.jwtService.sign(payload)
        return { token, expiresIn: this.jwtExpirationTime, user:foundUser, twoStepsAuth:foundUser.twoStepsAuth }
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
                id:string;
                email:string;
                name:string
            }
            const foundUser = await this.prisma.users.findUnique({
                where: {
                    id:decodedToken.id
                },
                omit: {
                    password:true,
                    twoStepsAuthCode:true,
                    providerId:true
                },
                
            })
            if(!foundUser){
                throw new UnauthorizedException()
            }
            return {...foundUser}
        } catch (err){
            console.log(err)
            throw new UnauthorizedException()
        }

    }
}
