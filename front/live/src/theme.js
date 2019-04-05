import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5391f4'
    }
  },    
  typography: {
    useNextVariants: true,
    /*fontFamily: [
      'Varela Round',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),*/
  },

});

export default theme;