import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';
import { Chip, Link } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function a11yProps(index: number) {
  return {
    id: `search-item-tab-${index}`,
    'aria-controls': `search-item-tab-${index}`,
  };
}

export default function ResultItem({
  index,
  result,
}: {
  index: number;
  result: any;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={
          <Link href="#" underline="none">
            {result.title}
          </Link>
        }
        subheader={result.database}
        color="secondary"
        {...a11yProps(index)}
      />
      <CardContent sx={{ paddingY: 0 }}>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Chip label="Open Access" color="primary" variant="outlined" />
          <Chip label="Diamond" color="success" variant="outlined" />
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more about this article"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2">Auteur(s):</Typography>
          <Typography paragraph>
            {result.authors?.map((author: any, index: number) => (
              <Link href="#" key={index} underline="none">
                {author}
              </Link>
            ))}
          </Typography>
          <Typography variant="subtitle2">Sujets:</Typography>
          <Typography paragraph>
            {result.subjects?.map((subject: any, index: number) => (
              <Link href="#" key={index} underline="none">
                {subject}
              </Link>
            ))}
          </Typography>
          <Typography variant="subtitle2">Date de publication:</Typography>
          <Typography paragraph>{result.publicationDate}</Typography>
          <Typography variant="subtitle2">Type de publication:</Typography>
          <Typography paragraph>{result.publicationType}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
