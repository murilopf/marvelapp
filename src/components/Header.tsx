import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    }
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h5" className={classes.title} color="inherit">
            Dextra 🤝 Marvel Comics
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
