import Divider from '@mui/material/Divider';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

export default function SearchFacet() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: grey[300],
      }}
    >
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel color="primary"> Filtrer par</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="texte intégral" />}
            label="texte intégral"
          />
          <FormControlLabel
            control={<Checkbox name="accès libre" />}
            label="accès libre"
          />
          <FormControlLabel
            control={<Checkbox name="relu par un comité de lecture" />}
            label="relu par un comité de lecture"
          />
        </FormGroup>
      </FormControl>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel color="primary">Type de ressource</FormLabel>
        <Divider />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="Academic Journal (125)" />}
            label="Academic Journal (125)"
          />
          <FormControlLabel
            control={<Checkbox name="Audit (3)" />}
            label="Audit (3)"
          />
          <FormControlLabel
            control={<Checkbox name="Biographie" />}
            label="Biographie"
          />
        </FormGroup>
      </FormControl>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel color="primary">Mot clé</FormLabel>
        <Divider />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="Covid (209)" />}
            label="Covid (209)"
          />
          <FormControlLabel
            control={<Checkbox name="anxiety (200)" />}
            label="anxiety (200)"
          />
          <FormControlLabel
            control={<Checkbox name="analyses (59)" />}
            label="analyses (59)"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
