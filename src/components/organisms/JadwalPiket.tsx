import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import JadwalPiketList from '../moleculs/JadwalPiketList';
import {JadwalPiketInterface} from '../../interfaces/jadwal.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}))

interface JadwalInterface {
  jadwal: JadwalPiketInterface[]
}

const JadwalPiket = (props: JadwalInterface) => {
  const classes = useStyles();

  return (
    <>
    <Divider className={classes.divider} />
    <Grid container justify="center">
      {props.jadwal.map((j, k:number) => (      
        <JadwalPiketList piket={j} key={k} />
      ))}
    </Grid>
    </>
  )
}

export default JadwalPiket;