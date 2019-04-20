import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import theme from './theme';
import jss from './styles';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import serialize from 'serialize-javascript';
import cookieParser from 'cookie-parser';
//import store from './store/store';
import loginConstants from './constants/loginConstants';
import axios from 'axios';
import { api } from './services/apiService';
import { initialState } from './reducers/streamReducer';
const https = require('https');

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server.use(cookieParser());

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async(req, res) => {

    const context = {};

    const sheetsManager = new Map();
    // This is needed in order to inject the critical CSS.
    const sheetsRegistry = new SheetsRegistry();

    //const generateClassName = createGenerateClassName();

    // Compile an initial state
    let preloadedState = { };

    if (req.cookies.AUTH_TOKEN) {

      preloadedState = {
        ...preloadedState,
        login: {
          authenticated: true,
          authToken: req.cookies.AUTH_TOKEN
        }
      }
    }
    /*
    if (req.originalUrl === "/") {
      await axios.get(api+"/Streams/GetStreams", {
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }).then(function (res) {

        preloadedState = {
          ...preloadedState,
          stream: {
            ...initialState,
            streams: res.data,
            firstLoad: true
          }
        }

      }).catch(function (errors) {

      });
    }*/

    // Create a new Redux store instance
    const store = configureStore(preloadedState);


    const markup = renderToString(
      <Provider store={store}>
        <JssProvider registry={sheetsRegistry} jss={jss}>
          <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    );
    const css = sheetsRegistry.toString();

     // Grab the initial state from our Redux store
     const finalState = store.getState();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>YarbTV</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Varela+Round" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">

        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }

        ${css ? `<style id='jss-server-side'>${css}</style>` : ''}

        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer ></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        
    </head>
    <body>
        <div id="root">${markup}</div>
        
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>

    </body>
</html>`
      );
    }
  });

export default server;
