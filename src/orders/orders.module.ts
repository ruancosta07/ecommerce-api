import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../services/prisma';
import { StripeService } from '../utils/stripe';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, StripeService],
  
})
export class OrdersModule {}
