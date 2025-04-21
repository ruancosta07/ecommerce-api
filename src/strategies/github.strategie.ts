import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github2";
import { PrismaService } from "../services/prisma";
import { UserDto } from "../users/users.dto";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private readonly configService: ConfigService, private readonly prisma: PrismaService, private readonly jwt: JwtService) {
        super({
            clientID: configService.get<string>("GITHUB_CLIENT_ID") as string,
            clientSecret: configService.get<string>("GITHUB_SECRET") as string,
            callbackURL: configService.get<string>("GITHUB_CALLBACK_URL") as string,
            scope: ["user:email"],
            passReqToCallback: false
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile
        , done: (error: any, user: any) => void) {
        const { emails, id, username, photos, displayName } = profile
        const user = {
            provider: 'github',
            id,
            email: emails[0].value,
            avatar: photos[0].value,
            name: displayName || username
        }
        const userHasFamilyName = user.name.split(" ")[1] !== ""
        const userExists = await this.prisma.users.findFirst({ where: { email:user.email} })
        let createdUser: UserDto;
        if (!userExists) {
            createdUser = await this.prisma.users.create({
                data: {
                    email: user.email,
                    name: userHasFamilyName ? user.name : user.name.replace(/ /g, ''),
                    avatar: user.avatar,
                    provider: 'github',
                    providerId: id,
                }
            })
        }
        const jwtToken = this.jwt.sign(userExists ? {
            id: userExists.id,
            email: userExists.email
        } : {
            id: createdUser.id,
            email: createdUser.email
        })
        done(null, { ...user, jwtToken })
    }
}