import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme, createMuiTheme, withStyles} from '@material-ui/core/styles';
import {JadwalPelajaranInterface, pelajaranInterface} from '../../interfaces/jadwal.interface';

const CustomTooltip = withStyles({
  tooltip: {
    fontSize: "1em",
    marginTop: 1,
    color: "#FFF",
  }
})(Tooltip);

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
    textAlign: 'center',
  },
}))

interface listPelajaranInterface {
  pelajaran: JadwalPelajaranInterface;
}
const JadwalPelajaranList = (props: listPelajaranInterface) => {
  const classes = useStyles();

  return (
      <Grid item xs={4}>
      <Typography variant="h6" color="primary" className={props.pelajaran.active ? classes.titleActive : classes.title}>{props.pelajaran.hari}</Typography>
      {props.pelajaran.jadwal.map((j: pelajaranInterface, k: number) => (
        <CustomTooltip arrow title={`${j.jam} Jam`} disableFocusListener disableTouchListener key={k}>
          <Typography variant="subtitle1" color="inherit" className={classes.subtitle}>{j.name}</Typography>        
        </CustomTooltip>
      ))}
      </Grid>
  )
}

export default JadwalPelajaranList;