import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HariIni from '../components/pages/HariIni';
import Pelajaran from '../components/pages/Pelajaran';
import Piket from '../components/pages/Piket';
import Tugas from '../components/pages/Tugas';

const Router = () => {
  return (
      <Switch>
        <Route path="/" exact>      
           <HariIni />
        </Route>
        <Route path="/pelajaran">      
           <Pelajaran />
        </Route>
        <Route path="/piket">      
           <Piket />
        </Route>
        <Route path="/tugas">      
           <Tugas />
        </Route>
      </Switch>
  )
}

export default Router;