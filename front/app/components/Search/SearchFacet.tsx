import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

export default function SearchFacet({ facets }: { facets: any }) {
  console.log(facets);
  if (!facets) {
    return null;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: grey[300],
      }}
    >
      {facets.map((facet: any, i: number) => (
        <FormControl
          key={i}
          sx={{ m: 3 }}
          component="fieldset"
          variant="standard"
        >
          <FormLabel color="primary">{facet.Label}</FormLabel>
          <FormGroup>
            {/* We limit to ten facets juste for the POC */}
            {facet.AvailableFacetValues.slice(0, 10).map(
              (facetValue: any, j: number) => (
                <FormControlLabel
                  key={j}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ py: 0 }}
                      name={`${facetValue.Value} (${facetValue.Count})`}
                    />
                  }
                  label={`${facetValue.Value} (${facetValue.Count})`}
                />
              ),
            )}
          </FormGroup>
        </FormControl>
      ))}
    </Box>
  );
}
