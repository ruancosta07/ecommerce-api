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

    async getAllReviews() {
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
    async getSingleReview(id: string): Promise<ReviewDto> {
        const review = await this.prisma.reviews.findFirst({
            where: { orderId:id },
        })
        return review
    }

    async addReview(req: Request, review: ReviewDto, id: string, productId:string) {
        const { foundUser } = await this.extractUserFromHeader(req)
        const lastPurchase = await this.prisma.orders.findFirst({
            where: {
                AND: [{
                    userId:foundUser.id
                }, {
                    id
                }]
            }
        })
        // if (!userBoughtProduct) {
        //     throw new UnauthorizedException()
        // }
        const [updatedOrder] =  await Promise.all([this.prisma.orders.update({
            where:{
                id:lastPurchase.id
            },
            data: {
                reviewed:true
            }
        }),
         this.prisma.reviews.create({
            data: { title: review.title, comment: review.comment, rating: review.rating, userId: foundUser.id, productId: productId, orderId:lastPurchase.id }
        })])
        
        return updatedOrder
    }



    private async extractUserFromHeader(req: Request) {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            throw new UnauthorizedException()
        }
        const decodedToken = await this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            id: string;
            name: string;
            email: string
        }
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id: decodedToken.id
            }
        })
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        return { foundUser }
    }
}
