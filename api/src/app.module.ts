import { Module } from '@nestjs/common';
import { EbscoModule } from './ebsco/ebsco.module';

@Module({
  imports: [EbscoModule],
})
export class AppModule {}
