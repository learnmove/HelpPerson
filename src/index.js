import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './store'
import {requestFetchJobList}  from './actions/jobAction'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CssBaseline from '@material-ui/core/CssBaseline';


ReactDOM.render(
      <MuiThemeProvider>

    <Provider store={store}>
        <App />


    </Provider>
  </MuiThemeProvider>



, document.getElementById('root'));
registerServiceWorker();
