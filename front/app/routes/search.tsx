import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { useActionData, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { CircularProgress, Tab, Tabs } from '@mui/material';
import SearchResult from '~/components/Search/SearchResult';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const query = formData.get('query');
  let res = await fetch(
    `${process.env.API_URL}/ebsco/INSHS/article/search?term=${query}&resultPerPage=10`,
  );
  const data = await res.json();
  return { query, data };
}

function a11yProps(index: number) {
  return {
    id: `mode-search-tab-${index}`,
    'aria-controls': `mode-search-tab-${index}`,
  };
}

export default function Search() {
  const actionData = useActionData();
  const [, setSearchParams] = useSearchParams();

  const [modeSearch, setModeSearch] = useState('article');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setModeSearch(newValue);
  };

  useEffect(() => {
    if (actionData?.query) {
      // setSearchParams({ query: actionData.query });
    }
  }, [actionData, setSearchParams]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4rem',
      }}
    >
      <Box sx={{ padding: '2rem' }}>
        <form method="post">
          <Box
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '4px',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, borderRadius: '4px' }}
              placeholder="Search article"
              inputProps={{ 'aria-label': 'Search article input' }}
              name="query"
              defaultValue={actionData?.query || ''}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="submit"
              color="primary"
              sx={{ p: '10px' }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={modeSearch}
            onChange={handleTabChange}
            aria-label="Change result mode"
            centered
          >
            <Tab label="Article" value="article" {...a11yProps(0)} />
            <Tab
              label="Publication"
              disabled
              value="publication"
              {...a11yProps(1)}
            />
            <Tab label="Metadore" disabled value="metadore" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {actionData?.data ? (
          <SearchResult modeSearch={modeSearch} />
        ) : (
          <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
