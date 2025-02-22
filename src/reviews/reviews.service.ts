import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ReviewDto } from './reviews.dto';
import { PrismaService } from '../services/prisma';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReviewsService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {

    }

    async getAllReviews(){
        const reviews = await this.prisma.reviews.findMany()
        return reviews
    }

    async getReviews(id: string): Promise<ReviewDto[]> {
        const foundUser = await this.prisma.users.findUnique({
            where: { id },
            include: {
                reviews: true
            }
        })
        return foundUser.reviews
    }
    async getSingleReview(id: string):Promise<ReviewDto> {
        const review = await this.prisma.reviews.findUnique({
            where: { id },
        })
        return review
    }

    async addReview(req: Request, review: ReviewDto, id: string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const userBoughtProduct = await this.prisma.orders.findFirst({
            where: {
                userId: foundUser.id
            }
        })
        // if (!userBoughtProduct) {
        //     throw new UnauthorizedException()
        // }
        await this.prisma.reviews.create({
            data: { ...review, userId: foundUser.id, productId: id }
        })
        throw new HttpException("Avaliação criada com sucesso", 201)
    }



    private async extractUserFromHeader(req: Request) {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            throw new UnauthorizedException()
        }
        const decodedToken = await this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub: string;
            name: string;
            email: string
        }
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id: decodedToken.sub
            }
        })
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        return { foundUser }
    }
}
