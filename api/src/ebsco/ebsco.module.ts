import { Module } from '@nestjs/common';
import { EbscoController } from './ebsco.controller';
import { JwtModule } from '@nestjs/jwt';
import { EbscoService } from './ebsco.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    HttpModule,
  ],
  controllers: [EbscoController],
  providers: [EbscoService],
})
export class EbscoModule {}
