import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {fetchRecruitList} from '../../api/api'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import  {Link} from 'react-router-dom'

import Icon from '@material-ui/core/Icon';

import Page from '../helper/Page'
class MyRecruit extends React.Component{
    state={
        recruits:[],
        page:{
          current_page:1,
          last_page:1 ,
      }
    }
    async fetchRecruitList(query){
        if(!localStorage.getItem('user'))return
        try{
       const response= await fetchRecruitList(query)
       this.setState({recruits:response.data.data})
        }catch(e){

        }
    }
    handlePage(direction){
      const search=new URLSearchParams(this.props.location.search)
      let page=search.get('page')
      if(page=='undefined')return
          if(direction=="+"){
      
      
      
            if(page>=this.state.page.last_page)
            {
              this.setState({success:false})
              return
            }
            page++
      
          }else{
      
            if(page-1<=0){
              this.setState({success:false})
              return
            }
            page--
      
          }
          search.set('page',page)
          this.props.history.push(`/my/recruit?${search.toString()}`)
          this.fetchRecruitList(`?${search.toString()}`)
        }
    componentDidMount(){
        this.fetchRecruitList(`?page=1`)
    }
    render(){
       
        return(
            <Grid container>

             <Grid md={3} xs={12}  >
             s
    </Grid>
             

             <Grid md={6} xs={12}  >

        <Paper  elevation={1} style={{background:'#244865',padding:'30px'}}>
    <Typography variant="headline" component="h1" style={{
        color:'#9FAFBB',
        whiteSpace: 'pre-line',
        textAlign: 'center',
        }}>
        我的投遞
    </Typography>
  
  </Paper>
  <Paper  elevation={1} style={{background:'rgb(50, 128, 191)',padding:'50px'}} >
      
{
    this.state.recruits&& this.state.recruits.map((item)=>{
         return (
            <Card style={{background:'#f4fcff',
            marginBottom: '5px'
            }}>
            <CardContent>
              <Typography  color="textSecondary">
               工作名稱
              </Typography>
              <Typography variant="headline" component="h2">
                {item.job_title}
              </Typography>
              <Typography color="textSecondary">
                金額
              </Typography>
              <Typography component="p">
                {item.money}<br />
              </Typography>
              <Typography color="textSecondary">
                狀況
              </Typography>
              <Typography component="p">
                {item.success}<br />
              </Typography>
              <Typography color="textSecondary">
                投遞日期
              </Typography>
              <Typography component="p">
                {item.created_at}<br />
              </Typography>
    
              <Button component={Link} to={`/user/${item.sender_id}`} >
              投遞人資料
              </Button>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
         )   
       
              })
}

      </Paper>
      </Grid>
      <Grid md={3} xs={12}  >
      d
      </Grid>
 
    </Grid>
        )
    }
}
export default MyRecruit