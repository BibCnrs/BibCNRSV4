import { Module } from '@nestjs/common';
import { EbscoController } from './ebsco.controller';
import { JwtModule } from '@nestjs/jwt';
import { EbscoService } from './ebsco.service';
import { HttpModule } from '@nestjs/axios';
import { DatabaseService } from '../database.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    HttpModule,
  ],
  controllers: [EbscoController],
  providers: [EbscoService, DatabaseService, PrismaService],
})
export class EbscoModule {}
