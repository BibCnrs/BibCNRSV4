import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';

const HistoryItem = () => {
  return (
    <Box>
      <Typography variant="h6" color="text.secondary">
        Terme: "test"
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Date: 10/10/2021
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Domain: INSHS
      </Typography>
      <Stack direction="row">
        <IconButton size="small" aria-label="reload">
          <ReplayIcon />
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" aria-label="edit">
          <EditIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default function SearchHistory() {
  return (
    <>
      <Typography variant="h6" color="text.secondary" sx={{ margin: 2 }}>
        Historique de recherche
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            09:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pb: 4 }}>
            <HistoryItem />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pb: 4 }}>
            <HistoryItem />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            12:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ pb: 4 }}>
            <HistoryItem />
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">
            13:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent sx={{ pb: 4 }}>
            <HistoryItem />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}
