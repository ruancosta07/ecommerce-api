import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from '../services/prisma';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, ConfigService, JwtService],
})
export class ReviewsModule {}
