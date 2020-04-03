import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ScheduleIcon from '@material-ui/icons/Schedule';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

import {useThemeContext} from '../../contexts/ThemeContext';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    boxShadow: '0px 6px 12px 9px rgba(0,0,0,0.1)',
  },
  mt: {
    marginTop: 70,
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const {state, dispatch} = useThemeContext();

  const handleChange = (event: React.ChangeEvent<{}>, path: string) => {
    if (path === 'toggleDarkTheme') {
     dispatch({type: 'TOGGLE_THEME'})
    } else {
     history.push(path)
     setValue(path)
    }
  };

  return (
    <>
    <div className={classes.mt}></div>
    <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels>
      <BottomNavigationAction label="Hari Ini" value="/" icon={<ScheduleOutlinedIcon />} />
      <BottomNavigationAction label="Pelajaran" value="/pelajaran" icon={<EventNoteOutlinedIcon />} />
      <BottomNavigationAction label="Piket" value="/piket" icon={<DateRangeIcon />} />
      <BottomNavigationAction label="Tugasku" value="/tugas" icon={<AssignmentOutlinedIcon />} />
      <BottomNavigationAction label={state.theme === 'dark' ? 'Light' : 'Dark'} value="toggleDarkTheme" icon={state.theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} />
    </BottomNavigation>
    </>
  );
}
