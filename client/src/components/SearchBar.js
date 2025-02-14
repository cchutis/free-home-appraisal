import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle'; 
// Disabled and moved to index.html to prevent API conflict of maps/search

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }

//   const script = document.createElement('script');
//   script.setAttribute('async', '');
//   script.setAttribute('id', id);
//   script.src = src;
//   position.appendChild(script);
// }

const autocompleteService = { current: null };

const useStyles = styled(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 800
    },
  },
}));

export default function SearchBar(props) {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);
    
    if (typeof window !== 'undefined' && !loaded.current) {
      // if (!document.querySelector('#google-maps')) {
      //   loadScript(
      //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWsjGBwu0-Z2FJT7gYJ0Z56XOJQyDG_jY&libraries=places',
      //     document.querySelector('head'),
      //     'google-maps',
      //   );
      // }
      loaded.current = true;
    }
    const handleChange = event => {
      setInputValue(event.target.value);
    };

  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: '90%' }}
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      options={options}
      autoComplete
      autoSelect={true}
      includeInputInList
      freeSolo
      disableOpenOnFocus
      onChange={(event, value) => {
        if(value.description) {
          props.search(value.description )
        } else {
          props.search(inputValue)
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Enter Address"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      )}
      renderOption={option => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
