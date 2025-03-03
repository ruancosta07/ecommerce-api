import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Request } from 'express';
import { ReviewDto } from './reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Get()
  getAll(){
    return this.reviewsService.getAllReviews()
  }

  @Get(":id")
  getReviews(@Param("id") id: string):Promise<ReviewDto[]> {
    return this.reviewsService.getReviews(id)
  }
  @Get("review/:id")
  getSingleReview(@Param("id") id: string):Promise<ReviewDto> {
    return this.reviewsService.getSingleReview(id)
  }

  @Post("create/:id")
  createReview(@Req() req: Request, @Body() review: ReviewDto, @Param("id") id: string, @Body("productId") productId:string) {
    return this.reviewsService.addReview(req, review, id, productId)
  }

}
