import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Theme, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      margin: theme.spacing(4),
      fontFamily: `Roboto Condensed, sans-serif`,
    },
  })
)

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        color='secondary'
        data-testid='appbar'
        className={classes.root}
      >
        <Toolbar>
          <Typography variant='h5' className={classes.title} color='inherit'>
            Dextra 🤝 Marvel Comics
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
