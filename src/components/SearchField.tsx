import React, { useState } from 'react';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import { InputBase, Box, Typography, Grid, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SnackBar from './SnackBar';

interface Props {
  setFilterValue: any;
  setIsLoading: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      border: 'solid',
      borderColor: "#202020",
      borderRadius: '6px',
      width: '95%',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      margin: '0px 8px 0px 8px'
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

    button: {
      alignContent: 'center'
    },
  }),
);

const SearchField: React.FC<Props> = ({ setFilterValue, setIsLoading }) => {
  const classes = useStyles();
  const [name, setName] = useState<string>('');

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [messageSnackbar, setMessageSnackbar] = useState<string>('');
  const [severitySnackbar, setSeverirySnackbar] = useState<"success" | "error" | "warning" | "info">('success')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSearchComicByName = () => {
    if (name.trim()) {
      setFilterValue(name)
    } else {
      setOpenSnackbar(true)
      setMessageSnackbar('Insira o nome de um personagem para consultas suas comics 🔎')
      setSeverirySnackbar("error")
    }
  }

  const handleResetSnackBar = () => {
    setOpenSnackbar(false)
    setMessageSnackbar('')
  }

  const handleClearFilter = () => {
    setIsLoading(true)
    setFilterValue('')
    setName('')
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <SnackBar
        snackBar={{ title: messageSnackbar, severity: severitySnackbar }}
        open={openSnackbar}
        resetSnackBar={handleResetSnackBar}
      />
      <Grid item xs={12}>
        <Box m={2}>
          <Typography variant="h5" gutterBottom>
            Procure seu personagem favorito ou navegue pelas páginas
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                inputProps={{
                  'aria-label': 'search',
                  'data-testid': "field"
                }}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-evenly">
              <Button variant='contained' color='secondary' onClick={handleSearchComicByName} className={classes.button} data-testid="find">
                Procurar
              </Button>

              <Button variant='contained' color='secondary' onClick={handleClearFilter} className={classes.button} data-testid="clear">
                Limpar filtro
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Grid>

    </Grid>
  );
}

export default SearchField
