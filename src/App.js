
import React from 'react';
import  {Route,BrowserRouter,Switch,Redirect,Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import AccountCircle from '@material-ui/icons/AccountCircle';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import JobList from './components/Job/JobList'
import Test from './components/test'
import {requestLogin} from './actions/userAction'

import {compose }from 'redux'
import GoogleLogin  from 'react-google-login';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FacebookLogin from 'react-facebook-login'
import Profile from './components/User/Profile'
import MyProfile from './components/User/MyProfile'
import MyApply from './components/User/MyApply'
import MyRecruit from './components/User/MyRecruit'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding:  0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    openMenu:false,
    anchor: 'left',
    left:false,
    anchorEl: null,
  };
componentDidMount(){
  if(localStorage.getItem('user')){
    this.props.requestLogin()
  }
}
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };
  toggleDrawer = (side, cc) => () => {

     this.setState({
       open:!this.state.open
     });
   };
   handleMenu = (event) => {
  this.setState({ openMenu:true,anchorEl: event.currentTarget });
};
handleClose = () => {
  this.setState({ anchorEl: null,openMenu:false });
};
   handleLogin=(vendor)=>{

     this.props.requestLogin(vendor)
   }
  render() {


    const { classes, theme } = this.props;
    const { anchor, open } = this.state;
    const avatar=this.props.data.user&&this.props.data.user.avatar
   
    const drawer = (
      <SwipeableDrawer
        variant="persistent"
        anchor={anchor}
        open={open}
         onClose={this.toggleDrawer('left', false)}
         onOpen={this.toggleDrawer('left', true)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List></List>
        <Divider />
        <List></List>
      </SwipeableDrawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <BrowserRouter>

      <div className={classes.root}>

        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.toggleDrawer('left',true)}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap style={{flex:1}}>
                <Link to="/job" style={{textDecoration:'none',
                color:"#ffffff",
                ":hover":{color:"#ffffff"},
                ":visited":{color:"#ffffff"},
                ":active":{color:"#ffffff"},
                ":link":{color:"#ffffff"},


              }}>8888求職網</Link>

              </Typography>

{this.props.data.user?
  <div>
                 <IconButton
                   aria-owns={open ? 'menu-appbar' : null}
                   aria-haspopup="true"
                   onClick={this.handleMenu}
                   color="inherit"
                 >
                 <img style={{borderRadius:50}} src={avatar}></img>
                 </IconButton>
                 <Menu
                   id="menu-appbar"
                   anchorEl={this.state.anchorEl}
                   anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                   }}
                   transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                   }}
                   open={this.state.openMenu}
                   onClose={this.handleClose}
                 >
                   <MenuItem component={Link} to={`/my/profile`} onClick={this.handleClose}>個人檔案</MenuItem>
                   <MenuItem component={Link} to={`/my/apply`} >我的投遞</MenuItem>
                   <MenuItem component={Link} to={`/my/recruit`}>我的招聘</MenuItem>
                   <MenuItem component={Link} to={`/my/message`}>我的訊息</MenuItem>

                 </Menu>
               </div>
  :  <FacebookLogin
    appId="1983046195052660"
    fields="name,email,picture,birthday"
    scope="public_profile, email, user_birthday"
callback={(responseFacebook)=>{
this.props.requestLogin(responseFacebook)
}
}
textButton="facebook登錄"
></FacebookLogin>}



            </Toolbar>
          </AppBar>
          {before}
          <main
            style={{overflow:'hidden'}}
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />

              <Switch>

              <Route exact path="/" component={JobList} ></Route>
              <Route exact path="/job" component={JobList} ></Route>
                <Route exact path="/test" component={Test} ></Route>
                <Route  path="/user/:id" component={Profile} ></Route>
                <Route exact path="/my/profile" component={MyProfile} ></Route>
                <Route exact path="/my/apply" component={MyApply} ></Route>
                <Route exact path="/my/recruit" component={MyRecruit} ></Route>


              </Switch>

          </main>
          {after}
        </div>
      </div>
    </BrowserRouter>

    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
{/**
  export default withStyles(styles, { withTheme: true })(PersistentDrawer);
  **/}

const mapStateToProps=({
  UserReducers:{
    isLoading,data,errors,success
  }
})=>({
  isLoading,
  data,
  errors,
  success
})
const mapDispatchToProp=(dispatch)=>{
  return {
    requestLogin:(vendor)=>dispatch(requestLogin(vendor))

  }
}
export default compose(
  withStyles(styles,{name:'PersistentDrawer', withTheme: true}),
  connect(mapStateToProps,mapDispatchToProp))
  (PersistentDrawer);
