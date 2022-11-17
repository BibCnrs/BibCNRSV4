import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleSearchQueryDto } from './dto/search-article.dto';
import { EbscoService } from './ebsco.service';

@Controller('ebsco')
export class EbscoController {
  constructor(private readonly ebscoService: EbscoService) {}

  @Get(':domainName/article/search')
  async search(
    @Param('domainName') domainName: string,
    @Query() query: ArticleSearchQueryDto,
  ) {
    const { authToken, sessionToken } =
      await this.ebscoService.createEbscoSession();
    const ebscoQuery = this.ebscoService.getEbscoQuery(query);
    const searchResult = await this.ebscoService.searchArticles(
      authToken,
      sessionToken,
      ebscoQuery,
    );
    return searchResult;
  }
}
