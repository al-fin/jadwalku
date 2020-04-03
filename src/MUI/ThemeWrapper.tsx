import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import {useThemeContext} from '../contexts/ThemeContext';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';


const ThemeWrapper = (props: any) => {
  const {state} = useThemeContext();
  const [theme, setTheme] = React.useState<any>({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '0.4em',
            borderRadius: 2,
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.15)',
            outline: '1px solid slategrey'
          }
        },
      },
    },
    palette: createPalette({
      primary: {
        main: state.theme === 'light' ? '#26a267' : red[500],
      },
      secondary: {
        main: state.theme === 'light' ? pink[500] : red[500],
      },
      type: state.theme,
    }),
  });


  React.useEffect(() => {
    setTheme({
      ...theme,
      palette: createPalette({
        primary: {
          main: state.theme === 'light' ? '#26a267' : red[500],
        },
        secondary: {
          main: state.theme === 'light' ? pink[500] : red[500],
        },
        type: state.theme
      }),
    });
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (state.theme === 'dark') {
      metaThemeColor!.setAttribute("content", '#F44336');
    } else {
      metaThemeColor!.setAttribute("content", '#26a267');
    }

    console.log('from theme wrapper : ', state.theme)

  }, [state])

  const themeConfig = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={themeConfig}>    
      {props.children}
    </MuiThemeProvider>
  );
}

export default ThemeWrapper;
