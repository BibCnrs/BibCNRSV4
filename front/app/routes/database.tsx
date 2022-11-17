import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { blue, green, grey, orange, purple, red } from '@mui/material/colors';

const colours = [blue[800], green[500], orange[500], purple[800], red[800]];
const getColour = () => colours[Math.floor(Math.random() * colours.length)];

export default function Search() {
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {/* Display category by letters */}
        {['A', 'B', 'C', 'D', 'E'].map((sectionId) => (
          <Box key={sectionId}>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: grey[100] }}
              subheader={
                <ListSubheader
                  sx={{
                    background: grey[100],
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {sectionId}
                </ListSubheader>
              }
            >
              {[0, 1, 2, 3].map((item) => (
                <ListItem key={item}>
                  <Card sx={{ minWidth: 345 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: getColour() }} aria-label="recipe">
                          {item}
                        </Avatar>
                      }
                      title={`Database ${sectionId}-${item}`}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Small description
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
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
