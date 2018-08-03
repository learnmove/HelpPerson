import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import swal from 'sweetalert'
import { connect } from 'react-redux'
import {compose }from 'redux'

import {fetchUserData,modifyUserDetailApi} from '../../api/api'
class MyProfile extends React.Component{
    state={
        isLoading:false,
        type:'profile',
        user:{
            age:'',
avatar:'',
content:'哈哈',
created_at:'',
experience:'幫很多人',
name:'王小明',
profession:'打球',
school:'高雄大學',
updated_at:"2018-07-14 09:06:20"
        },
        userModify:{
            age:'',
avatar:'',
content:'哈哈',
created_at:'',
experience:'幫很多人',
name:'王小明',
profession:'打球',
school:'高雄大學',
updated_at:"2018-07-14 09:06:20"
        },
        userid:null,
    }
    handleChange = name => event => {
        this.setState({
         userModify:{...this.state.userModify,
            [name]: event.target.value,
         }
        });
      };
      handleChangeType(type){
          this.setState({
              type:type
          })
      }
      async handleSubmit(){
          try{
            await modifyUserDetailApi(this.state.userModify)
            this.setState({user:this.state.userModify})
            swal('修改成功')
          }catch(e){
            swal('修改失敗')
          }
      }
   async componentDidMount(){
    this.setState({isLoading:true,userid:this.props.match.params.id})
    try{

    let userDATA=await fetchUserData(this.props.user.id)
    this.setState({userModify:userDATA.data,user:userDATA.data,isLoading:false})
    console.log(this.state)
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
                {this.state.type=="profile"?
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
                 <Paper  elevation={1} style={{background:'rgb(50, 128, 191)',padding:'50px'}}>
                   <Typography variant="headline" component="h1" style={{
                       color:'#FFFFFF',
                       fontSize: '50px',
                       textAlign: 'center',
                       }}>
                     {this.state.user.name}
                     
                   </Typography>
            <Button variant="contained" color="secondary" onClick={this.handleChangeType.bind(this,"edit")} >修改</Button>

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
                   <Typography variant="headline" component="p" style={{
                       color:'#9FAFBB',
                       textAlign: 'center',
                       }}>
                     {this.state.user.content}
                   </Typography>
                 </Paper>
              
                 
                 <Paper  elevation={1} style={{background:'#244865',padding:'50px'}}>
                   <Typography component="h2" style={{
                       color:'#FFFFFF',
                       fontSize: '40px',
                       textAlign: 'center',
                       }}>
                   專長
                   </Typography>
           
                   <Typography variant="headline" component="p" style={{
                       color:'#9FAFBB',
                       whiteSpace: 'pre-line',
                       textAlign: 'center',
                       }}>
          {this.state.user.profession}
                   </Typography>
                 
                 </Paper>
                 <Paper  elevation={1} style={{background:'#244865',padding:'50px'}}>
                   <Typography component="h2" style={{
                       color:'#FFFFFF',
                       whiteSpace: 'pre-line',

                       fontSize: '40px',
                       textAlign: 'center',
                       }}>
                   經驗
                   </Typography>
           
                 </Paper>
                 <Paper  elevation={1} style={{background:'#244865',padding:'30px'}}>
                   <Typography variant="headline" component="p" style={{
                        whiteSpace: 'pre-line',
                       color:'#9FAFBB',
                       textAlign: 'center',
                       }}>
          {this.state.user.experience}
                   </Typography>
                 
                 </Paper>
                 
                           </Grid>: <Grid md={6}  xs={12}>
                           
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
   
      <Paper  elevation={1} style={{background:'rgb(50, 128, 191)',padding:'16px'}}>
      <Button variant="contained" color="secondary" onClick={this.handleChangeType.bind(this,"profile")} >檢視</Button>
      <Typography variant="headline" component="h1" style={{
                       color:'#FFFFFF',
                       fontSize: '30px',
                       marginBottom:'50px',
                       textAlign: 'center',
                       }}>
                     個人資料修改
                     
                   </Typography>
      <form noValidate autoComplete="off" style={{background:'rgb(200, 222, 255)',padding:'5px'}} >
        <TextField
           InputLabelProps={{
            shrink: true,
          }}
          id="name"
          label="名字"
          style={{padding:'5px'}}
          value={this.state.userModify.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
                <TextField
                   InputLabelProps={{
                    shrink: true,
                  }}
          id="name"
          label="學校"
          style={{padding:'5px'}}

          value={this.state.userModify.school}
          onChange={this.handleChange('school')}
          margin="normal"
        />
        
      
                <TextField
          id="full-width"
          label="專長"
          value={this.state.userModify.profession}
          multiline
          rows="4"

          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Placeholder"
          fullWidth
          margin="normal"
          onChange={this.handleChange('profession')}

        />
                    <TextField
          id="full-width"
          label="經驗"
          value={this.state.userModify.experience}
          onChange={this.handleChange('experience')}

          multiline
          rows="4"

          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Placeholder"
          fullWidth
          margin="normal"
        />
                    <TextField
                    multiline
          id="full-width"
          label="自我介紹"
          value={this.state.userModify.content}
          rows="4"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange('content')}

          placeholder="Placeholder"
          fullWidth
          margin="normal"
        />
        <Button  onClick={this.handleSubmit.bind(this)} variant="contained" color="primary">送出</Button>

        </form>

      </Paper>
     
      
                </Grid>}
               
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
    (MyProfile);
