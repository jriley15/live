import App from './App';
import { BrowserRouter }  from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import theme from './theme';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import JssProvider from 'react-jss/lib/JssProvider';
//import store from './store/store';


//const sheetsManager = new WeakMap();

const store = configureStore(window.__PRELOADED_STATE__);

const generateClassName = createGenerateClassName();

const rehydrate = () => {
  hydrate(
      <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MuiThemeProvider>
      </Provider>,
    document.getElementById('root'),
    () => {
      // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
      const jssStyles = document.getElementById('jss-server-side');
      //if (jssStyles && jssStyles.parentNode)
        //jssStyles.parentNode.removeChild(jssStyles);
    }
  );
}

rehydrate();

if (module.hot) {

  module.hot.accept('./App', () => {
    rehydrate();
  });

}
