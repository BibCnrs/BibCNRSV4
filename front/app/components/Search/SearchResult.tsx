import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import SearchFacet from './SearchFacet';
import ResultList from './ResultList';

export default function SearchResult({
  modeSearch,
  data,
  page,
  setPage,
}: {
  modeSearch: string;
  data: any;
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        backgroundColor: grey[100],
      }}
    >
      <Box sx={{ flex: 1 }}>
        <SearchFacet facets={data.facets} />
      </Box>
      <Box sx={{ flex: { xs: 1, sm: 3 } }}>
        <ResultList
          modeSearch={modeSearch}
          results={data.results}
          nbTotalResults={data.totalHits}
          page={page}
          setPage={setPage}
        />
      </Box>
    </Box>
  );
}
