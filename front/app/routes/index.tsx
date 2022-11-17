import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTransition } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { redirect } from '@remix-run/node';
import { FormEvent } from 'react';

export default function Index() {
  const transition = useTransition();
  console.log('index transition', transition);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: `calc(100vh - 4rem)`,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4rem',
      }}
    >
      <Typography
        variant="h4"
        color={'primary'}
        sx={{ mb: 6, fontWeight: 'bold', textAlign: 'center' }}
      >
        Accès aux ressources documentaires du CNRS
      </Typography>
      <Form method="get" action="/search">
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
            name="term"
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
      </Form>
    </Box>
  );
}
