import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ArticleSearchQueryDto } from './dto/search-article.dto';
import { EbscoService } from './ebsco.service';
import { JwtGuard } from './jwt.guard';

@Controller('ebsco')
//@UseGuards(JwtGuard)
export class EbscoController {
  constructor(private readonly ebscoService: EbscoService) {}

  @Get(':domainName/article/search')
  async search(@Param('domainName') domainName: string, @Query() query: ArticleSearchQueryDto) {
    const { authToken, sessionToken } = await this.ebscoService.createEbscoSession();
    const ebscoQuery = this.ebscoService.getEbscoQuery(query);
    const searchResult = await this.ebscoService.searchArticles(authToken, sessionToken, ebscoQuery);
    return searchResult;
  }
}
