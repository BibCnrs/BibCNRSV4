import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ArticleSearchQueryDto } from './dto/search-article.dto';
import {
  articleParser,
  parseActiveFacets,
  parseDateRange,
  sortFacet,
} from '../common/helper/parser.helper';

@Injectable()
export class EbscoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async createEbscoSession(): Promise<{
    authToken: string;
    sessionToken: string;
  }> {
    try {
      const {
        data: { AuthToken: authToken },
      } = await this.httpService.axiosRef({
        method: 'post',
        url: `${process.env.EBSCO_API_URL}/authservice/rest/UIDAuth`,
        data: {
          UserId: process.env.INSHS_USER_ID,
          Password: process.env.INSHS_PASSWORD,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const {
        data: { SessionToken: sessionToken },
      } = await this.httpService.axiosRef({
        method: 'post',
        url: `${process.env.EBSCO_API_URL}/edsapi/rest/CreateSession`,
        data: {
          Profile: process.env.INSHS_PROFILE,
          Guest: 'n',
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-authenticationToken': authToken,
        },
      });
      return {
        authToken,
        sessionToken,
      };
    } catch (error: any) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  getEbscoQuery(query: ArticleSearchQueryDto) {
    return {
      SearchCriteria: {
        Queries: [
          {
            BooleanOperator: 'AND',
            FieldCode: null,
            Term: query.term,
          },
        ],
        SearchMode: 'all',
        IncludeFacets: 'y',
        FacetFilters: [],
        Limiters: query.fullText === true ? [{ Id: 'FT', Values: ['Y'] }] : [],
        Expanders: [],
        Sort: query.sort || 'relevance',
      },
      RetrievalCriteria: {
        View: 'brief',
        ResultsPerPage: query.resultsPerPage,
        PageNumber: 1,
        Highlight: 'n',
      },
      Actions: [`goToPage(${query.page || 1})`],
    };
  }

  async searchArticles(
    authToken: string,
    sessionToken: string,
    ebscoQuery: any,
  ) {
    try {
      const { data } = await this.httpService.axiosRef({
        method: 'post',
        url: `${process.env.EBSCO_API_URL}/edsapi/rest/Search`,
        data: ebscoQuery,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-authenticationToken': authToken,
          'x-sessionToken': sessionToken,
        },
      });
      return data;
    } catch (error: any) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  articleResultsParser(searchResults: any) {
    return {
      results: searchResults.SearchResult.Data.Records.map((record: any) =>
        articleParser(record),
      ),
      totalHits: searchResults.SearchResult.Statistics.TotalHits,
      currentPage: searchResults.SearchRequest.RetrievalCriteria.PageNumber,
      maxPage: Math.ceil(
        searchResults.SearchResult.Statistics.TotalHits /
          searchResults.SearchRequest.RetrievalCriteria.ResultsPerPage,
      ),
      facets: (searchResults.SearchResult.AvailableFacets || []).map(
        (facet: any) => {
          if (facet.Id === 'ContentProvider') {
            return sortFacet(facet, 'HAL');
          }

          return sortFacet(facet, null);
        },
      ),
      activeFacets: parseActiveFacets(
        searchResults.SearchRequest.SearchCriteria.FacetFilters,
      ),
      dateRange: parseDateRange(searchResults.SearchResult),
    };
  }
}
