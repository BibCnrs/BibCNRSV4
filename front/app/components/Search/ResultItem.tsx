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
import { Chip } from '@mui/material';
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

export default function ResultItem({ index }: { index: number }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title="Cross Cultural Attitude Inventory [and] Test Manual."
        subheader="September 14, 2016"
        color="secondary"
        {...a11yProps(index)}
      />
      <CardContent sx={{ paddingY: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Jackson, Steve; Klinger, Ron; Dissemination and Assessment Center for
          Bilingual Education, Austin, TX. 64 pp.
        </Typography>
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
          <Typography paragraph>Resumé:</Typography>
          <Typography paragraph>
            The Cross-Cultural Attitude Inventory provides a means for measuring
            the degree of positive or negative feeling which Mexican-American
            and Angle students (ages 3 to 18) have for the two cultures. Present
            test validity is based on face validity and the rationale behind the
            item selection and construction procedures. The inventory also
            provides a springboard from which other ideas may come. The
            inventory is comprised of 24 test items that relate to language,
            facial characteristics, foods, games, clothing, sports, and flags.
            The use of five faces beneath each item seems to work well with
            children in a wide range of age, sex, and ethnic categories. The
            test provides a score based on an equal number of items
            representative of each culture. It is a relatively quick instrument
            to administer (20-30 minutes), and is easy for both test
            administrator and subjects to understand. The age range of subjects
            who can be expected to understand and relate to the test is from 3
            to 12 years, although older subjects have been used; the test should
            be administered individually to those of junior-high age or older.
            Administration of the test is discussed as to time considerations,
            physical facilities, materials, language considerations, special
            considerations by age group, and instructions to students (ages 3
            through 8 and ages 9 and above) and terms to be used for test items.
            The test is scored by assigning a value of 1 to 5. A copy of the
            Test Data Recording Form is provided. (Author/DB)
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
