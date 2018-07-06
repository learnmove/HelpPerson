import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';

import Icon from '@material-ui/core/Icon';

import   cities from '../../api/city'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux'
import {compose }from 'redux'
import { Link } from 'react-router-dom';

import {requestFetchJobList} from '../../actions/jobAction'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {fetchJobContent} from '../../api/api'
import queryString from 'query-string'

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  gridList: {
   flexWrap: 'nowrap',
   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
   transform: 'translateZ(0)',
 },
 rightIcon: {
    marginLeft: theme.spacing.unit,
  },
 title: {
   color: theme.palette.primary.light,
 },
 titleBar: {
   background:
     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
 },
});

class JobList extends React.Component {

  state = {
    openDialog:false,
    openSnackbar:false,
    expanded: false,
    select:{},
    success:true,
    isSelect:false
    ,data:{},
    isLoading:false,
    cityValue:5,
   };
   constructor(props){
     super(props)


   }
  handleClickOpen = scroll => () => {
     this.setState({ openDialog: true, scroll });
   };

   handleClose = () => {
     this.setState({ openDialog: false });
   };
   handleExpandClick = async (item) => {

this.setState(state=>({isLoading:true,openDialog:true,select:{}}))
let {data:{data}}=await fetchJobContent(item.id)
this.setState(state => ({isLoading:false ,select:  Object.assign({},item,{content:data.content}) }))




  };
  componentDidMount(){
    this.fetchJobList(this.props.location.search)
  }
  handleTab(){
    this.fetchJobList()

  }

  componentWillReceiveProps(){
  }
  handlePage(direction){
const search=new URLSearchParams(this.props.location.search)
let page=search.get('page')
if(page=='undefined')return
    if(direction=="+"){



      if(page>=this.props.data.last_page)
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
    this.props.history.push(`/job?${search.toString()}`)
    console.log(search.toString())
    this.fetchJobList(`?${search.toString()}`)
  }
  fetchJobList(search){

    this.props.requestFetchJobList(search)
  }

  render() {
    let { classes,data,isLoading,errors,success } = this.props;
        let p=new URLSearchParams(this.props.location.search)

let value=cities.findIndex((item)=>{return item.title==p.get('city');})+1

if(value==-1){
  value=0
}
    let cc=  data&&data.data.map(item=>{
      const avatar_link=`/user/${item.user.id}`
      const handleExpandClick=this.handleExpandClick.bind(this,item)

        return (



        <Grid key={item.id} item xs={12} sm={12} lg={12} xl={12}  style={{padding: 3}}>
          <Card className={classes.card} style={{maxWidth:'100%'}}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" src={item.user.avatar} component={Link} to="/test" >

                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.user.name}
              subheader={item.created_at}
            />
        {/*    <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Contemplative Reptile"
            />
          */}
            <CardContent>
              <Typography variant="headline" style={{textAlign:'center'}} component="h2">
              {item.title}
              </Typography>
              <hr></hr>
  <Typography style={{color:'#E74C3C'}} component="p">
  酬勞 ${item.money}

  </Typography>


              <Typography component="p">
              位置 {item.position}

              </Typography>
              <Typography component="p">
              時間 {item.time}

              </Typography>
              <Typography component="p">
            連絡方式 {item.contact}
              </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography component="p">
            地區 {item.city}
              </Typography>
            </Grid>
              <Grid item xs={6}>
                <Typography style={{color:'#9C9C9C',paddingRight:5,textAlign:'right'}} component="p">
              {item.applies_count}個人應徵

                </Typography>
              </Grid>

          </Grid>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>



              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <Button  variant="contained" color="primary" aria-label="delete" className={classes.button}>
                    <NavigationIcon className={classes.extendedIcon} />
                    應徵
                  </Button>

              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: false,
                })}
                onClick={handleExpandClick}
                aria-expanded={this.state.expanded+`-${item.id}`}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
        {/**
          <Collapse in={this.state.select==item} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Method:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
          **/}
          </Card>

              </Grid>

      )

}
    )

const tab=cities.map(item=>{
let link=`/job?city=${item.title}&page=1`
return (  <Tab label={item.title}
component={Link}
to={link}
onClick={this.handleTab}
    />)

}

)
    return (

      <Grid container spacing={24} style={{padding: 10}}>
        <Grid xs={12} md={12}>
          <Tabs
           value={value}
           onChange={this.handleChange}
           indicatorColor="primary"
           textColor="primary"
           scrollable
           scrollButtons="auto"
         >
         <Tab label="全部"
         component={Link}
         to="/job?page=1"
         onClick={this.handleTab}
             />
           {tab}

         </Tabs>
        </Grid>
        <Grid item xs={12} sm={12}  lg={2} xl={2} >
        </Grid>
        <Grid item xs={12} sm={12}  lg={8} xl={8} style={{padding: 0}} >
          {isLoading?<CircularProgress></CircularProgress>:
    cc
      }
      <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!success||!this.state.success}
      autoHideDuration={3000}
      onClose={()=>{this.setState({success:true})}}

      message={<span id="message-id">找不到資料</span>}

    />



        </Grid>
{this.props.data&&<Grid container>
        <Grid xs={12} xl={12} style={{textAlign:'center',padding:50}}>
          <IconButton aria-label="Add to favorites" onClick={this.handlePage.bind(this,"-")}>
            <Icon>
            chevron_left</Icon>

          </IconButton>
          <IconButton aria-label="Add to favorites" onClick={this.handlePage.bind(this,"+")}>
          <Icon>  chevron_right</Icon>
          </IconButton>
        </Grid>
      </Grid>}
        <Grid item xs={12} sm={12}  lg={2} xl={2} >
s
        </Grid>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{this.state.select.title&&this.state.select.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>

             {this.state.select.content?this.state.select.content:<CircularProgress></CircularProgress>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleClose} color="primary">
              確定
            </Button>
          </DialogActions>
        </Dialog>

      </Grid>

    );
  }
}

JobList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=({JobReducers:{isLoading,data,errors,success}})=>({
  isLoading,
  data,
  errors,
  success
})
const mapDispatchToProp=(dispatch)=>{
  return {
    requestFetchJobList:(data)=>dispatch(requestFetchJobList(data))

  }
}
export default compose(
  withStyles(styles,{name:'JobList'}),
  connect(mapStateToProps,mapDispatchToProp))
  (JobList);
