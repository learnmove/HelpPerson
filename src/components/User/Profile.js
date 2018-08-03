import React from 'react'
import Grid from '@material-ui/core/Grid';
import ProfileData from  './ProfileData'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert'
import { connect } from 'react-redux'
import {compose }from 'redux'
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import Evaluation from './Evaluation'
import {fetchUserData} from '../../api/api'
class Profile extends React.Component{
    state={
        isLoading:false,
        user:{
            age:null,
avatar:null,
content:null,
created_at:null,
experience:null,
id:2,
name:"Koanna Wang",
profession:null,
school:null,
updated_at:"2018-07-14 09:06:20"
        },
        userid:null,
    }
   async componentDidMount(){
    this.setState({isLoading:true,userid:this.props.match.params.id})
    try{

    let userDATA=await fetchUserData(this.props.match.params.id)
    this.setState({user:userDATA.data,isLoading:false})
    console.log(this.state)
    this.props.history.push(`/user/${this.state.user.id}/profile`);
}catch(e){
    swal("使用者尚未填寫")
}
    }
    componentDidUpdate(){
        
    }

   
    render(){
        return(
            <Grid container>
             <Grid md={3} xs={12}  >
      <Paper  elevation={1} >
        <Typography variant="headline" component="h3">
                方大同的個人履歷
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
                </Grid>
                 <Grid md={6}  xs={12}>

                 <Paper  elevation={1} style={{background:'#4CA8E6'}}>
                       <img src={this.state.user.avatar} style={{
                           display: 'block',
                           margin: 'auto',
                           borderRadius: '50%',
                           width: '200px',
                           height:' 200px',
                           padding:' 43px',
                       }}></img>
                 </Paper>
                 <Paper  elevation={1} style={{background:'#244865',padding:'50px'}}>
                   <Typography variant="headline" component="h1" style={{
                       color:'#FFFFFF',
                       fontSize: '50px',
                       textAlign: 'center',
                       }}>
                     {this.state.user.name}
                     
                   </Typography>

                   <Typography component="h2" style={{
                       color:'#FFFFFF',
                       fontSize: '40px',
                       textAlign: 'center',
                       }}>
                   關於我
                   </Typography>
                   <Typography component="h2" style={{
                       color:'#F7F8F9',
                       fontSize: '20px',
                       textAlign: 'center',
                       }}>
                     {this.state.user.age}
                   歲
                   </Typography>
                   <Typography component="h2" style={{
                       color:'#F7F8F9',
                       fontSize: '20px',
                       textAlign: 'center',
                       }}>
                     {this.state.user.school}
                   </Typography>
                   <p><Link to={`/user/${this.state.user.id}/profile`}>Root</Link></p>
                   <p><Link to={`/user/${this.state.user.id}/evaluation`}>evaluation</Link></p>
                 </Paper>
                <Switch>
                    <Route
               exact path="/user/:id/profile" 

                     render={(props)=>{
               return  <ProfileData
                user={this.state.user}></ProfileData>
                    }}>
                    </Route>
                
                    <Route
               exact path="/user/:id/evaluation" 
                    
                    render={(props)=>{
               return  <Evaluation
                user={this.state.user}></Evaluation>
                    }}></Route>

                </Switch>
                           </Grid>
               
                   <Grid md={3}  xs={12}>
      <Paper  elevation={1}>
        <Typography variant="headline" component="h3">
          dddddddddddddddddddd
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps=({UserReducers:{data:{user}}})=>({
    user
  })
  const mapDispatchToProp=(dispatch)=>{
    return {
    }
  }
  export default compose(
    connect(mapStateToProps,mapDispatchToProp))
    (Profile);
