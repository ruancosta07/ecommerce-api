import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { PrismaService } from "src/services/prisma";
import { UserDto } from "src/users/users.dto";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService, private readonly prisma:PrismaService, private readonly jwt:JwtService) {
        super({
            clientID: configService.get<string>("GOOGLE_CLIENT_ID") as string,
            clientSecret: configService.get<string>("GOOGLE_SECRET") as string,
            callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL") as string,
            scope: ["profile", 'email'] 
        })
    } 
    async validate(accessToken: string, refreshToken: string, profile: {
        id:string,
        name: {
            familyName:string,
            givenName:string
        },
        email:string,
        picture:string
    }, done: VerifyCallback) {
        const {email, id, name, picture} = profile
        const user = {
            provider:'google',
            id,
            email,
            avatar:picture,
            name: `${name.givenName} ${(name.familyName ? name.familyName : '')}`
        }
        const userHasFamilyName = user.name.split(" ")[1] !== ""
        const userExists = await this.prisma.users.findFirst({where: {email:email}})
        let createdUser:UserDto;
        if(!userExists){
           createdUser = await this.prisma.users.create({data: {
                email,
                name: userHasFamilyName ? user.name: user.name.replace(/ /g, ''),
                avatar: picture,
                provider: 'google',
                providerId: id,
            }})
        }
        const jwtToken = this.jwt.sign(userExists ?{
            id:userExists.id,
            email:userExists.email
        } :{
            id: createdUser.id,
            email:createdUser.email
        })
        done(null, {...user, jwtToken})
    }
} 