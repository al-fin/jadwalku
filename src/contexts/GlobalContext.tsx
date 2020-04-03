import React from 'react';
import {JadwalInterface} from '../interfaces/jadwal.interface';

const hari_ini = new Date().getDay();

const initialState: JadwalInterface = {
   pelajaran: [
    { hari: 'senin', jadwal: [
      {name: 'Agama', fullName: 'Pendidikan Agama dan Budi Pekerti', jam: 3},
      {name: 'Manajemen', fullName: 'Manajemen Produksi, Naskah, dan Penyutradaraan', jam: 4 },
      {name: 'Editing', fullName: 'Editing Audio dan Video', jam: 3},
    ],
    active: hari_ini === 1 ? true : false,
  },
    { hari: 'selasa', jadwal: [
      {name: 'MTK', fullName: 'Matematika', jam: 2},
      {name: 'B. Inggris', fullName: 'Bahasa Inggris', jam: 2},
      {name: 'B. Indonesia', fullName: 'Bahasa Indonesia', jam: 2},
      {name: 'Tata Artistik', fullName: 'Tata Artistik', jam: 4},
    ],
    active: hari_ini === 2 ? true : false,
  },
    { hari: 'rabu', jadwal: [
      {name: 'MTK', fullName: 'Matematika', jam: 2},
      {name: 'PKK', fullName: 'Produk Kreatif, dan Kewirausahaan', jam: 4},
      {name: 'PKN', fullName: 'Pendidikan Pancasila dan Kewarganegaraan', jam: 2},
      {name: 'B. Jawa', fullName: 'Bahasa Jawa', jam: 2},
    ],
    active: hari_ini === 3 ? true : false,
  },
    { hari: 'kamis', jadwal: [
      {name: 'B. Inggris', fullName: 'Bahasa Inggris', jam: 2},
      {name: 'PKK', fullName: 'Produk Kreatif, dan Kewirausahaan', jam: 4},
      {name: 'MTK', fullName: 'Matematika', jam: 2},
      {name: 'B. Indonesia', fullName: 'Bahasa Indonesia', jam: 2},
    ],
    active: hari_ini === 4 ? true : false,
  },
  { hari: 'jumat', jadwal: [
    {name: 'B. Inggris', fullName: 'Bahasa Inggris', jam: 2},
    {name: 'PKK', fullName: 'Produk Kreatif, dan Kewirausahaan', jam: 5},
    {name: 'Editing', fullName: 'Editing Audio dan Video', jam: 3},
  ],
  active: hari_ini === 5 ? true : false,
  },
  ],
  piket: [
    { hari: 'senin', jadwal: ['Devi Widi', 'Ibnu', 'Khulaila', 'Marcella', 'Raihan', 'Wulan', 'Ifa'], active: hari_ini === 1 ? true : false},
    { hari: 'selasa', jadwal: ['Bima', 'Ira', 'Tri', 'Nurul', 'Bagas', 'Inggrid'], active: hari_ini === 2 ? true : false},
    { hari: 'rabu', jadwal: ['Dafan', 'Elsa', 'Risna', 'Fatan', 'Figo', 'Syalung', 'Kamila'], active: hari_ini === 3 ? true : false},
    { hari: 'kamis', jadwal: ['Adella', 'Dani', 'Dyah', 'Dwi Ayu', 'Betrand', 'Sefti', 'Devi Putri'], active: hari_ini === 4 ? true : false},
    { hari: 'jumat', jadwal: ['Azela', 'Neni', 'Citra', 'Alfin', 'Anam', 'Surya', 'Anita'], active: hari_ini === 5 ? true : false},
  ],
};


const GlobalContext = React.createContext<JadwalInterface>(initialState);


function GlobalContextProvider(props: any) {
  return (
    <GlobalContext.Provider value={initialState}>{props.children}</GlobalContext.Provider>
  );
}

function useGlobalContext() {
  const context = React.useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context;
}

let GlobalContextConsumer = GlobalContext.Consumer;

export { GlobalContext, GlobalContextProvider, GlobalContextConsumer, useGlobalContext };


