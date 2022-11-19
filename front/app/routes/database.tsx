import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLoaderData } from '@remix-run/react';
import { grey } from '@mui/material/colors';

export async function loader() {
  const response = await fetch(`${process.env.API_URL}/ebsco/databases`);
  const data = await response.json();

  // Create a list of databases grouped by first letter
  const databasesByLetter = data.reduce((acc: any, database: any) => {
    const firstLetter = database.name_fr[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(database);
    return acc;
  }, {});
  return databasesByLetter;
}

export default function Search() {
  const databasesByLetter = useLoaderData();

  console.log('databasesByLetter', databasesByLetter['A']);
  return (
    <Box
      sx={{
        marginTop: '4rem',
        backgroundColor: grey[100],
        padding: '1rem',
      }}
    >
      <Typography variant="h4" color="text.secondary" sx={{ margin: 2 }}>
        Retrouvez toutes les databases disponibles
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Display category by letters */}
        {Object.keys(databasesByLetter)
          .sort()
          .map((letter) => (
            <Box key={letter}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: grey[100],
                }}
                subheader={
                  <ListSubheader
                    sx={{
                      background: grey[100],
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    {letter}
                  </ListSubheader>
                }
              >
                {databasesByLetter[letter].map((database: any) => (
                  <ListItem key={database.id}>
                    <Card>
                      <CardHeader title={database.name_fr} />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {database.text_fr}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <img
                          width={25}
                          height={25}
                          src={database.image}
                          alt={database.name_fr}
                        />
                      </CardActions>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
