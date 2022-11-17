import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import SearchFacet from './SearchFacet';
import SearchItems from './SearchItems';

export default function SearchResult({ modeSearch }: { modeSearch: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        backgroundColor: grey[100],
      }}
    >
      <Box sx={{ flex: 1 }}>
        <SearchFacet />
      </Box>
      <Box sx={{ flex: { xs: 1, sm: 3 } }}>
        <SearchItems modeSearch={modeSearch} />
      </Box>
    </Box>
  );
}
