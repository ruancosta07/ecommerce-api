import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../services/prisma';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from '../services/supabase';
import { SharpFile } from '../utils/sharp';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SupabaseService, SharpFile],
})
export class UsersModule {}
