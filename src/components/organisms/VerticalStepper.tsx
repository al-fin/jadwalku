import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import {useGlobalContext} from '../../contexts/GlobalContext';
import {JadwalPelajaranInterface} from '../../interfaces/jadwal.interface';
import Speech from 'speak-tts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    time: {
      color: '#AAA',
    }
  }),
);

function getSteps(pelajaran: JadwalPelajaranInterface) {
  console.log(pelajaran)
  // return ['MTK', 'MTK', 'MTK', 'Istirahat', 'MTK', 'MTK', 'MTK', 'istirahat', 'MTK', 'MTK', 'MTK', 'MTK'];
  // return ['MTK', 'MTK', 'MTK', 'Istirahat' 'MTK', 'MTK', 'MTK', 'MTK', 'MTK', 'istirahat', 'MTK', 'MTK'];
  const tempJadwal: string[] = [];
  pelajaran.jadwal.forEach((j) => {
    for (let x=0; x<j.jam; x++) {
      tempJadwal.push(j.fullName)
    }
  });
  const hari = new Date().getDay();
  if (hari === 5) {
    tempJadwal.splice(4, 0, 'Istirahat')
    tempJadwal.splice(9, 0, 'Istirahat')
  } else {
    tempJadwal.splice(3, 0, 'Istirahat')
    tempJadwal.splice(7, 0, 'Istirahat')
  }

  return tempJadwal;
}

function getStepContent(step: number) {
  const hari = new Date().getDay();
  if (hari === 5) {
    switch (step) {
      case 0:
        return `07.00 - 07.35`;
      case 1:
        return `07.35 - 08.10`;
      case 2:
        return `08.10 - 08.45`;
      case 3:
        return `08.45 - 09.20`; 
      case 4:
        return `09.20 - 09.35`; // istirahat
      case 5:
        return `09.35 - 10.10`;
      case 6:
        return `10.10 - 10.45`;
      case 7:
        return `10.45 - 11.20`; 
      case 8:
        return `11.20 - 11.55`;
      case 9:
        return `11.55 - 12.50`; // istirahat
      case 10:
        return `12.50 - 13.25`;
      case 11:
        return `13.25 - 14.00`;
      default:
        return 'Unknown step';
    }
  } else {
    switch (step) {
      case 0:
        return `07.00 - 07.45`;
      case 1:
        return `07.45 - 08.30`;
      case 2:
        return `08.30 - 09.15`;
      case 3:
        return `09.15 - 09.30`; // istirahat
      case 4:
        return `09.30 - 10.15`;
      case 5:
        return `10.15 - 11.00`;
      case 6:
        return `11.00 - 11.45`;
      case 7:
        return `11.45 - 12.30`; // istirahat
      case 8:
        return `12.30 - 13.15`;
      case 9:
        return `13.15 - 14.00`;
      case 10:
        return `14.00 - 14.45`;
      case 11:
        return `14.45 - 15.30`;
      default:
        return 'Unknown step';
    }
  }
}

export default function VerticalStepper() {
  const classes = useStyles();
  const {pelajaran} = useGlobalContext();
  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = getSteps(pelajaran.filter((p) => p.active === true)[0]);
  const speech = new Speech() // will throw an exception if not browser supported

  function setActiveStepAndSpeak(step: number) {
    setActiveStep(step)
    const hari = new Date().getDay();
    // const hari = 5;
    let sekarang = steps[step];
    console.log('CEK', sekarang)
    let text = '';
    if (step === -1) {
      text = `Pelajaran hari ini belum dimulai !`;
    } else if (hari === 5 && (step === 4 || step === 9)) {
      text = "Sekarang adalah jam istirahat !";
    } else if (hari !== 5 && (step === 3 || step === 7)) {
      text = "Sekarang adalah jam istirahat !";
    } else if (step < 12) {
      text = `Pelajaran ${steps[step]} sedang berlangsung !`;
    } else {
      text = `Pelajaran hari ini telah selesai !`;
    }  

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


        speech.speak({
          text: text,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
    }).catch((e: any) => {
        console.error("An error occured while initializing : ", e)
    })
  }


  React.useEffect(() => {
    let jam = new Date().getHours();
    let menit = new Date().getMinutes();
    let hari = new Date().getDay();

    // let jam = 12;
    // let menit = 40;
    // let hari = 2;

    if(hari === 5) {
      if (jam<7) {
        setActiveStepAndSpeak(-1)
      } else if (jam===7 && menit<35) {
        setActiveStepAndSpeak(0)
      }
      else if ((jam===7 && menit>=35) || (jam===8 && menit<10)) {
        setActiveStepAndSpeak(1)
      }
      else if ((jam===8 && menit>=10) || (jam===8 && menit<45)) {
        setActiveStepAndSpeak(2)
      }
      else if ((jam===8 && menit>45) || (jam===9 && menit<20)) {
        setActiveStepAndSpeak(3)
      }

      else if ((jam===9 && menit>=20) || (jam===9 && menit<35)) {
        setActiveStepAndSpeak(4)
      }
      else if ((jam===9 && menit>=35) || (jam===10 && menit<10)) {
        setActiveStepAndSpeak(5)
      }
      else if ((jam===10 && menit>=10) || (jam===10 && menit<45)) {
        setActiveStepAndSpeak(6)
      }

      else if ((jam===10 && menit>=45) || (jam===11 && menit<20)) {
        setActiveStepAndSpeak(7)
      }
      else if ((jam===11 && menit>=20) || (jam===11 && menit<55)) {
        setActiveStepAndSpeak(8)
      }
      else if ((jam===11 && menit>=55) || (jam===12 && menit<50)) {
        setActiveStepAndSpeak(9)
      }
      else if ((jam===12 && menit>=50) || (jam===13 && menit<25)) {
        setActiveStepAndSpeak(10)
      } else if ((jam===13 && menit>=25) || (jam===14 && menit<1)) {
        setActiveStepAndSpeak(11)
      } else {
        setActiveStepAndSpeak(12)
      }

    }
    else {
      if (jam<7) {
        setActiveStepAndSpeak(-1)
      } else if (jam===7 && menit<45) {
        setActiveStepAndSpeak(0)
      }
      else if ((jam===7 && menit>=45) || (jam===8 && menit<30)) {
        setActiveStepAndSpeak(1)
      }
      else if ((jam===8 && menit>=30) || (jam===9 && menit<15)) {
        setActiveStepAndSpeak(2)
      }

      else if ((jam===9 && menit>=15) || (jam===9 && menit<30)) {
        setActiveStepAndSpeak(3)
      }
      else if ((jam===9 && menit>=30) || (jam===10 && menit<15)) {
        setActiveStepAndSpeak(4)
      }
      else if ((jam===10 && menit>=15) || (jam===11 && menit<1)) {
        setActiveStepAndSpeak(5)
      }
      else if (jam===11 && menit<45) {
        setActiveStepAndSpeak(6)
      }

      else if ((jam===11 && menit>=45) || (jam===12 && menit<30)) {
        setActiveStepAndSpeak(7)
      }
      else if ((jam===12 && menit>=30) || (jam===13 && menit<15)) {
        setActiveStepAndSpeak(8)
      }

      else if ((jam===13 && menit>=15) || (jam===14 && menit<1)) {
        setActiveStepAndSpeak(9)
      }
      else if (jam===14 && menit<45) {
        setActiveStepAndSpeak(10)
      }
      else if ((jam===14 && menit>=45) || (jam===15 && menit<30)) {
        setActiveStepAndSpeak(11)
      } else {
        setActiveStepAndSpeak(12)
      }

    }

    return () => {
      speech.cancel()
    }

  }, [])

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>            
              <Typography className={classes.time}>{getStepContent(index)}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
