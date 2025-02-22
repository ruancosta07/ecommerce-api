import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../services/prisma';
import { SupabaseService } from '../services/supabase';
import { SharpFile } from '../utils/sharp';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, SupabaseService, SharpFile],
})
export class ProductsModule {}
