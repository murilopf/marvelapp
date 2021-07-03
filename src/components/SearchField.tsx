import React, { useState } from 'react';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import { InputBase, Box, Typography, Grid, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getComicsByCharactersName } from '../services/api'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      border: 'solid',
      borderColor: "#202020",
      borderRadius: '6px',
      width: '100%',
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: '#202020',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
  }),
);

const SearchField: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSearchComicByName = () => {
    getComicsByCharactersName(name, 0)
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Box>
          <Typography variant="h5" gutterBottom>
            Procure seu personagem favorito ou navegue pelas páginas
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                value={name}
                onChange={handleChange}
                placeholder="Spider-man, Thor, Hulk"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Box>

          <Box>
            <Button variant='contained' color='secondary' onClick={handleSearchComicByName}>
              Procurar
            </Button>
          </Box>
        </Box>

      </Grid>

    </Grid>
  );
}

export default SearchField
