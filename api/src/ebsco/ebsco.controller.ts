import { Controller, Get, Param, Query } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { ArticleSearchQueryDto } from './dto/search-article.dto';
import { EbscoService } from './ebsco.service';

@Controller('ebsco')
export class EbscoController {
  constructor(
    private readonly ebscoService: EbscoService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get(':domainName/article/search')
  async search(
    @Param('domainName') domainName: string,
    @Query() query: ArticleSearchQueryDto,
  ) {
    const { authToken, sessionToken } =
      await this.ebscoService.createEbscoSession();
    const ebscoQuery = this.ebscoService.getEbscoQuery(query);
    let searchResult = await this.ebscoService.searchArticles(
      authToken,
      sessionToken,
      ebscoQuery,
    );
    searchResult = this.ebscoService.articleResultsParser(searchResult);
    return searchResult;
  }

  @Get('databases')
  async getAllDatabases() {
    const databases = await this.databaseService.databases({});
    return databases;
  }
}
