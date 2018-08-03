import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import Icon from '@material-ui/core/Icon';

import {fetchAppliesList} from '../../api/api'
import Page from '../helper/Page'


class MyApply extends React.Component{
    state={
        applies:[],
        success:false,
        page:{
            current_page:1,
            last_page:1 ,
        }

    }
    async fetchAppliesList(pageQuery){
        if(!localStorage.getItem('user'))return
        try{
       const response= await fetchAppliesList(pageQuery)
       this.setState({
           applies:response.data.data,
            page:{...this.page,last_page:response.data.last_page}
    })
        }catch(e){

        }
    }
    componentDidMount(){
        this.fetchAppliesList("?page=1")
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
            this.props.history.push(`/my/apply?${search.toString()}`)
            this.fetchAppliesList(`?${search.toString()}`)
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
    this.state.applies&& this.state.applies.map((item)=>{
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
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
         )   
       
              })
}
<Grid container>
        <Grid xs={12} xl={12} style={{textAlign:'center',padding:50}}>
          <IconButton aria-label="Add to favorites" onClick={this.handlePage.bind(this,"-")}>
            <Icon>
            chevron_left</Icon>

          </IconButton>
          <IconButton aria-label="Add to favorites" onClick={this.handlePage.bind(this,"+")}>
          <Icon>  chevron_right</Icon>
          </IconButton>
        </Grid>
      </Grid>


      </Paper>
      </Grid>
      <Grid md={3} xs={12}  >
      d
      </Grid>
 
    </Grid>
        )
    }
}
export default MyApply