import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import JadwalPelajaranList from '../moleculs/JadwalPelajaranList';
import {JadwalPelajaranInterface} from '../../interfaces/jadwal.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}))

interface JadwalInterface {
  jadwal: JadwalPelajaranInterface[]
}

const JadwalPelajaran = (props: JadwalInterface) => {
  const classes = useStyles();

  return (
    <>
    <Divider className={classes.divider} />
    <Grid container justify="center">
      {props.jadwal.map((j, k:number) => (      
        <JadwalPelajaranList pelajaran={j} key={k} />
      ))}
    </Grid>
    </>
  )
}

export default JadwalPelajaran;