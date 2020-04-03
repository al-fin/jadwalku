import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from '../../router/Router';
import BottomNavigation from '../organisms/BottomNavigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  background: {
    background: theme.palette.primary.main,
    height: 205,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: -99,
  },
  mt: {
    marginTop: theme.spacing(2),
  },
  paper: {
    boxShadow: '0px 1px 3px 3px rgba(0,0,0,0.03), 0px 3px 16px 6px rgba(0,0,0,0.15)',
    padding: theme.spacing(2),
    borderRadius: 16,
  },
}))

export default function Index() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Grid container justify="center" alignItems="center" className={classes.mt}>
        <Grid item xs={12}>        
          <div className={classes.background} />
        </Grid>

        <Grid item xs={11} sm={8} md={6}>
          <Paper className={classes.paper}>
            <Router />             
          </Paper>
        </Grid>
      </Grid>
      <BottomNavigation />
    </BrowserRouter>
  );
}
