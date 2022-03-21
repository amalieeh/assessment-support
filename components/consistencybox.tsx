import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Option {
  value: string;
  label: string;
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

const ConsistencyBox: React.FC<{}> = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>('random');

  const marks = [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' },
  ];

  const options: Option[] = [
    { value: 'random', label: 'Tilfeldig' },
    { value: 'scores_alike', label: 'Like scores' },
    { value: 'scores_unlike', label: 'Ulike scores' },
    { value: 'correlation', label: 'Korrelasjon' },
  ];

  const title = 'Konsistenssjekk';
  const content = 'Sjekken velger ut X antall besvarelser for revurdering.';

  function valuetext(value: number) {
    return `${value}%`;
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <div style={{ marginBottom: 10, fontWeight: 'bold' }}>{title}</div>
          <div>{content}</div>
        </CardContent>
        <CardContent>Bruk konsistenssjekk:</CardContent>
        <CardActions>
          <Switch
            checked={checked}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </CardActions>
        <CardContent> Andel besvarelser som skal revurderes:</CardContent>
        <CardActions disableSpacing>
          {checked ? (
            <Slider
              sx={{ marginLeft: '1.2rem', marginRight: '1rem' }}
              aria-label="Custom marks"
              defaultValue={10}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
            />
          ) : (
            <Slider
              sx={{ marginLeft: '1.2rem', marginRight: '1rem' }}
              disabled
              aria-label="Custom marks"
              defaultValue={10}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
            />
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>Velg type sjekk som ønskes:</CardContent>
          <CardActions>
            {checked ? (
              <FormControl sx={{ marginLeft: '0.5rem' }}>
                <RadioGroup
                  row
                  name="controlled-radio-buttons-group"
                  value={radioValue}
                  onChange={handleRadioClick}
                >
                  {options.map((option: Option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      disableTypography
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <FormControl sx={{ marginLeft: '0.5rem' }}>
                <RadioGroup
                  row
                  name="controlled-radio-buttons-group"
                  value={radioValue}
                  onChange={handleRadioClick}
                >
                  {options.map((option: Option) => (
                    <FormControlLabel
                      disabled
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      disableTypography
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </CardActions>
        </Collapse>
      </Card>
    </div>
  );
};

export default ConsistencyBox;
