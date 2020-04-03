import React from 'react';
import {useThemeContext} from '../../contexts/ThemeContext';
import Title from '../atoms/Title';
import VerticalStepper from '../organisms/VerticalStepper';
import PartyIllustrationGreen from '../../assets/party-green.svg';
import PartyIllustrationRed from '../../assets/party-red.svg';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/id';
import Speech from 'speak-tts';

moment().locale('id')

const useStyles = makeStyles((theme: Theme) => createStyles({
  divider: {
    marginTop: theme.spacing(1),
  },
  imgWrapper: {
    marginTop: 20,
    marginBottom: 10,
  },
  img: {
    width: '100%'
  },
  date: {
    textAlign: 'center',
    color: '#AAA',
  }
}))

const HariIni = () => {
  const classes = useStyles();
  const {state} = useThemeContext();

  const speech = new Speech() // will throw an exception if not browser supported


  React.useEffect(() => {

    speech.init({
      'volume': 1,
       'lang': 'id-ID',
       'rate': 1,
       'pitch': 1,
       'splitSentences': true,
       'listeners': {
           'onvoiceschanged': (voices: any) => {
               console.log("Event voiceschanged", voices)
           }
       }
   }).then((data: any) => {
     console.log('initialized !')
     if (new Date().getDay() === 0 || new Date().getDay() === 6) {
        speech.speak({
          text: 'Tidak ada pelajaran, Hari ini sedang libur !',
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
      }
   }).catch((e: any) => {
       console.error("An error occured while initializing : ", e)
   })

  return () => {
    speech.cancel()
  }

  }, [])


  if (new Date().getDay() === 0 || new Date().getDay() === 6) {
    return (
      <>
      <Grid container justify="center" alignItems="center" className={classes.imgWrapper}>
        <Grid item xs={10} md={8}>
          <img src={state.theme === 'light' ? PartyIllustrationGreen : PartyIllustrationRed} className={classes.img} />
        </Grid>
      </Grid>
      <Title text="Hari ini sedang libur !" />
      </>
    )
  } else {
    return (
      <>
      <Title text="Jadwal Hari ini" />
      <Typography variant="overline" display="block" className={classes.date}>{moment().format('dddd, Do MMMM YYYY')}</Typography>
      <Divider className={classes.divider} />
      <VerticalStepper />
      </>
    )
  }
}

export default HariIni;