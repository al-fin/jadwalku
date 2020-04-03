import React from 'react';
import Title from '../atoms/Title';
import {useGlobalContext} from '../../contexts/GlobalContext';
import JadwalPiket from '../organisms/JadwalPiket';
import Speech from 'speak-tts';

const Piket = () => {
  const {piket} = useGlobalContext();
  let text = 'Jadwal Piket hari ini adalah. ';
  const filtered = piket.filter((p: any) => p.active === true);
  if (filtered.length === 0) {
    text = 'Tidak ada jadwal Piket, Hari ini sedang libur !';
  } else {
    filtered[0].jadwal.forEach((p: any, k: number) => {
      if (k === filtered[0].jadwal.length-1) {
        text += 'dan yang terakhir adalah '+p+'.';
      } else {
        text += 'yang ke-'+Number(k+1)+p+'. ';
      }
    })
  }

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

   return () => {
     speech.cancel()
   }

  }, [])


  return (
    <>
    <Title text="Jadwal Piket" />
    <JadwalPiket jadwal={piket} />
    </>
  )
}

export default Piket;