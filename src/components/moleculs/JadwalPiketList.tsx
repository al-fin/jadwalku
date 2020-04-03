import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {JadwalPiketInterface} from '../../interfaces/jadwal.interface';


const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  titleActive: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    background: theme.palette.type === 'dark' ? 'rgba(244,67,54, 0.2)' : 'rgba(38,162,103, 0.2)',
    color: theme.palette.type === 'dark' ? 'rgba(244,67,54, 1)' : 'rgba(38,162,103, 1)',
    borderRadius: 16,
  },
  subtitle: {
    fontWeight: 300,
    textAlign: 'center'
  }
}))

interface JadwalProps {
  piket: JadwalPiketInterface;
}
const JadwalPiketList = (props: JadwalProps) => {
  const classes = useStyles();

  return (
      <Grid item xs={4}>
      <Typography variant="h6" color="primary" className={ props.piket.active ? classes.titleActive : classes.title}>{props.piket.hari}</Typography>
      {props.piket.jadwal.map((j, k: number) => (
        <Typography variant="subtitle1" color="inherit" className={classes.subtitle} key={k}>{j}</Typography>        
      ))}
      </Grid>
  )
}

export default JadwalPiketList;