import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
}))


interface TitleProps {
  text: string;
}
const Title = (props: TitleProps) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" color="primary" className={classes.title}>{props.text}</Typography>
  )
}

export default Title;