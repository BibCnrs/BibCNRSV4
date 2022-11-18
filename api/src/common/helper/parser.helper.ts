import {
  defaultToEmptyArray,
  defaultToEmptyObject,
  defaultToNull,
} from './default.helper';

export const parseDateRange = (results: any) => {
  if (
    !results ||
    !results.AvailableCriteria ||
    !results.AvailableCriteria.DateRange
  ) {
    return {
      min: 1000,
      max: new Date().getFullYear() + 1,
    };
  }
  const { MinDate, MaxDate } = results.AvailableCriteria.DateRange;

  return {
    min: parseInt(MinDate.substr(0, 4), 10),
    max: Math.min(MaxDate.substr(0, 4), new Date().getFullYear() + 1),
  };
};

export const parseActiveFacets = (rawActiveFacets: any) => {
  if (!rawActiveFacets) {
    return {};
  }

  const activeFacetValues = rawActiveFacets.reduce(
    (result: any, activeFacet: any) => {
      return [...result, ...activeFacet.FacetValues];
    },
    [],
  );

  return activeFacetValues.reduce((result: any, facetValue: any) => {
    const values = result[facetValue.Id] || [];
    return {
      ...result,
      [facetValue.Id]: [...values, facetValue.Value],
    };
  }, {});
};

// sort facet by alphabetical order, second argument is used for override first value
export const sortFacet = (facet: any, overridenFirstValue: any) => {
  facet.AvailableFacetValues.sort((a: any, b: any) => {
    return a.Value.localeCompare(b.Value);
  });

  const overrideIndex = facet.AvailableFacetValues.findIndex(
    (d: any) => d.Value === overridenFirstValue,
  );

  if (overrideIndex !== -1) {
    const [value] = facet.AvailableFacetValues.splice(overrideIndex, 1);
    facet.AvailableFacetValues.unshift(value);
  }

  return facet;
};

export function cleanUrl(url: string) {
  if (!url) {
    return url;
  }

  const match = url.match(/(http(s)?:.+)/);
  return match ? match[0] : null;
}

const extractPdfLinks = defaultToEmptyArray((result: any) => {
  return result.FullText.Links.filter(
    ({ Type, Url }: { Type: any; Url: any }) => Type === 'pdflink' && !!Url,
  ).map(({ Url }: { Url: any }) => ({ url: cleanUrl(Url) }));
});

const extractFullTextLinks = defaultToEmptyArray((result: any) => {
  return result.FullText.CustomLinks.filter(
    ({ Category }: { Category: any }) => Category === 'fullText',
  ).map((link: any) => ({
    url: cleanUrl(link.Url.replace(/&amp;/g, '&')),
    name: link.Text,
  }));
});

const articleLinkParser = (result: any) => {
  return {
    fullTextLinks: extractFullTextLinks(result),
    pdfLinks: extractPdfLinks(result),
  };
};

const extractExportLinks = defaultToEmptyObject((result: any) => {
  return result.CustomLinks.filter(
    (link: any) =>
      link.Category === 'other' && !link.Url.includes('api.unpaywall'),
  ).reduce(
    (result: any, link: any) => ({
      ...result,
      [link.Name]: link.Url.replace('&amp;', '&'),
    }),
    {},
  );
});

const extractTargetFromItems = (
  attr: any,
  value: any,
  items: any,
  target = 'Data',
) => {
  return items
    .filter((item: any) => item[attr] === value)
    .reduce((_: any, item: any) => item[target], null);
};

const extractDOI = defaultToNull((result: any) => {
  return extractTargetFromItems(
    'Type',
    'doi',
    result.RecordInfo.BibRecord.BibEntity.Identifiers,
    'Value',
  );
});

const extractTitle = defaultToNull((result: any) => {
  return extractTargetFromItems(
    'Type',
    'main',
    result.RecordInfo.BibRecord.BibEntity.Titles,
    'TitleFull',
  );
});

const extractSource = defaultToNull((result: any) => {
  return extractTargetFromItems('Name', 'TitleSource', result.Items).replace(
    /&lt;.*?&gt;/g,
    '',
  ); // remove xml tag if any
});

const extractAuthors = defaultToNull((result: any) => {
  return result.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships.map(
    (data: any) => data.PersonEntity.Name.NameFull,
  );
});

const extractPublicationDate = defaultToNull((result: any) => {
  return result.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates.filter(
    (data: any) => data.Type === 'published',
  ).reduce((result: any, data: any) => {
    const date = new Date(`${data.M}/${data.D}/${data.Y}`);
    if (date.toString() === 'Invalid Date') {
      throw new Error('Invalid Date');
    }

    return date;
  }, null);
});

const extractLanguages = defaultToNull((result: any) => {
  return result.RecordInfo.BibRecord.BibEntity.Languages.map(
    (data: any) => data.Text,
  );
});

const extractDatabase = defaultToNull((result: any) => {
  return result.Header.DbLabel || result.Header.DbId;
});

const extractSubjects = defaultToNull((result: any) => {
  return result.RecordInfo.BibRecord.BibEntity.Subjects.map(
    (data: any) => data.SubjectFull,
  );
});

const extractPublicationType = defaultToNull((result: any) => {
  if (result.Header.PubType) {
    return result.Header.PubType;
  }
  if (result.Header.PubId && result.Header.PubId !== 'unknown') {
    return result.Header.PubId;
  }

  if (result.Header.DbId === 'edsndl') {
    return 'Dissertation/ Thesis';
  }

  return extractTargetFromItems('Name', 'TypePub', result.Items);
});

const extractAbstract = defaultToNull((result: any) => {
  return extractTargetFromItems('Name', 'Abstract', result.Items);
});

export const articleParser = (result: any) => {
  return {
    id: result.ResultId,
    an: result.Header.An,
    dbId: result.Header.DbId,
    articleLinks: articleLinkParser(result),
    exportLinks: extractExportLinks(result),
    doi: extractDOI(result),
    title: extractTitle(result),
    source: extractSource(result),
    authors: extractAuthors(result),
    publicationDate: extractPublicationDate(result),
    languages: extractLanguages(result),
    database: extractDatabase(result),
    subjects: extractSubjects(result),
    publicationType: extractPublicationType(result),
    abstract: extractAbstract(result),
    doiRetry: result.doiRetry,
  };
};
