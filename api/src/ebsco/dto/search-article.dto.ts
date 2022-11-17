import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { toBoolean } from '../../common/helper/cast.helper';

export class ArticleSearchQueryDto {
  @IsString()
  term!: string;

  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  fullText?: boolean;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  resultsPerPage?: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
