import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import { Pagination, SwipeableDrawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ResultItem from './ResultItem';
import { useState } from 'react';
import SearchHistory from './SearchHistory';

type ResultListProps = {
  modeSearch: string;
  results: Array<any>;
  nbTotalResults: number;
};

export default function ResultList({
  modeSearch,
  nbTotalResults,
  results,
}: ResultListProps) {
  const [isOpenHistory, setOpenHistory] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenHistory(open);
    };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="text.secondary" sx={{ margin: 2 }}>
          {nbTotalResults} résultats
        </Typography>

        <IconButton
          size="large"
          aria-label="history search"
          color="primary"
          sx={{ margin: 2 }}
          onClick={toggleDrawer(true)}
        >
          <HistoryIcon />
        </IconButton>
      </Box>

      {results?.map((result, i) => (
        <ResultItem key={i} index={i} result={result} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} color="primary" sx={{ paddingBottom: '1rem' }} />
      </Box>

      <SwipeableDrawer
        anchor={'right'}
        open={isOpenHistory}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: { width: '20%' },
        }}
      >
        <SearchHistory />
      </SwipeableDrawer>
    </Box>
  );
}
