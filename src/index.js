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
import { createHistory, useBasename } from 'history'
import swal from 'sweetalert';
import axios from 'axios' 
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  let errorMesage=error.response.data.error
  console.log(errorMesage.indexOf('token'))
  if(errorMesage.indexOf('token')!=-1||errorMesage.indexOf('user')!=-1){
    swal("您的登錄期限已過期，請從新登錄")
    localStorage.removeItem('user')
    window.location.reload()
  }
  return Promise.reject(error);
});


ReactDOM.render(
      <MuiThemeProvider>

    <Provider store={store}>
        <App />


    </Provider>
  </MuiThemeProvider>



, document.getElementById('root'));
registerServiceWorker();
