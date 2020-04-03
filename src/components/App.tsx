import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeWrapper from '../MUI/ThemeWrapper';
import {ThemeContextProvider} from '../contexts/ThemeContext';
import {GlobalContextProvider} from '../contexts/GlobalContext';
import Index from './pages/Index';
import 'typeface-roboto';

export default function App() {
  return (
    <>
    <GlobalContextProvider>
    <ThemeContextProvider>
      <ThemeWrapper>
        <CssBaseline />
        <Index />
      </ThemeWrapper>
    </ThemeContextProvider>
    </GlobalContextProvider>
    </>
  );
}
