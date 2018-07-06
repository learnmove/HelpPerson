import  {Route,BrowserRouter,Switch} from 'react-router-dom'
import React, { Component } from 'react';
import axios from 'axios'
import {GetJob} from '../api/api.js'
class NewR extends Component{
  componentWillMount(){
    this.fetchJob()
  }
  fetchJob(){
    axios.get(GetJob)
    .then((res)=>console.log(res))
  }
  render(){
    return(
      <div></div>
    )
  }
}
export default ()=>{
  return (

    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={NewR}></Route>
      <Route path="/job" component={NewR}></Route>

      </Switch>
    </BrowserRouter>
  )
}
