import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { StripeService } from './utils/stripe';
import { ConfigModule, } from '@nestjs/config';
import { PrismaService } from './services/prisma';
import { WebhookService } from './webhook/webhook.service';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookModule } from './webhook/webhook.module';
import { NodemailerService } from './utils/nodemailer';
@Module({
  imports: [UsersModule, AuthModule, ProductsModule, ReviewsModule, OrdersModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), WebhookModule],
  providers: [PrismaService, StripeService, WebhookService, NodemailerService],
  exports: [StripeService, NodemailerService],
  controllers: [WebhookController],
})
export class AppModule { }
