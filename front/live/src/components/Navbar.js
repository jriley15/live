import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Login from './Login';
import { MenuList, MenuItem, Menu, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../actions/loginActions';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
      },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {

        fontSize: '20px',
        fontFamily: 'Varela Round, sans-serif',
        color: '#777',
        textDecoration: 'none'
        //marginRight: theme.spacing.unit * 7
    },
    logoMobile: {

      fontSize: '20px',
      fontFamily: 'Varela Round, sans-serif',
      color: '#777',
      textDecoration: 'none'

  },
    tv: {
        color: '#5391f4'
    },

    link: {
        
        fontFamily: 'Varela Round, sans-serif',
        fontSize: '14px',
        color: '#777',
        textTransform: 'none',
        marginLeft: theme.spacing.unit
    },
    linkButton: {
        marginLeft: theme.spacing.unit * 2,
        fontFamily: 'Varela Round, sans-serif',
        fontSize: '14px',
        color: 'white',
        backgroundColor: '#5391f4',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: darken('#5391f4', 0.25),
        },
        whiteSpace: 'nowrap'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade('#5391f4', 0.15),
        '&:hover': {
          backgroundColor: fade('#5391f4', 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
      },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      inputRoot: {
        color: 'inherit',
        width: '100%',
      },

      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20
      },
      deskTopbar: {
        paddingLeft: theme.spacing.unit * 2
      },
      list: {
        width: 200,
      },

  });

class Navbar extends Component {

    state = {
        loginOpen: false,
        drawer: false
    };

    logout = () => {
      
      this.props.logout();
      this.setState(state => ({ loginOpen: false }));
    };

    handleToggle = () => {
        this.setState(state => ({ loginOpen: !state.loginOpen }));
    };
    
    handleClose = event => {
        if (this.loginEl.contains(event.target)) {
            return;
        }

        this.setState({ loginOpen: false });
    };
    
    
    toggleDrawer = (state) => () => {

      this.setState({drawer: state});

  }
  render() {

    const { classes } = this.props;
    const { loginEl, loginOpen } = this.state;

    return (

        <div className={classes.root}>

            <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
              <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer(false)}
                  onKeyDown={this.toggleDrawer(false)}
              >
                <div className={classes.list}>
                  <List>

                      <ListItem button key={0}>
                        <ListItemIcon> <HomeIcon/> </ListItemIcon>
                        <ListItemText primary={"Home"} />
                      </ListItem>

                      {this.props.loginState.authenticated && <ListItem button key={1}>
                        <ListItemIcon> <DashboardIcon/> </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                      </ListItem>}

                      {this.props.loginState.authenticated && <ListItem button key={2}>
                          <ListItemIcon> <ExitIcon/> </ListItemIcon>
                          <ListItemText primary={"Logout"} />
                      </ListItem>}


                      {!this.props.loginState.authenticated && <ListItem button key={3}>
                        <ListItemIcon> <HomeIcon/> </ListItemIcon>
                        <ListItemText primary={"Home"} />
                      </ListItem>}

                    </List>
                  </div>
              </div>
            </Drawer>

            <AppBar position="fixed" color="default" className={classes.appBar}>

                <Toolbar variant="dense" className={classes.sectionMobile}>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>

                  <div className={classes.grow} />

                  <Link className={classes.logoMobile} to="/">
                      Yarb<b className={classes.tv}>TV</b>
                  </Link>
                </Toolbar>
                
                <Toolbar variant="dense" className={classes.sectionDesktop}>
                    
                    <Link className={classes.logo}  to="/">
                        Yarb<b className={classes.tv}>TV</b>
                    </Link>

                    <Grid container direction="row" justify="flex-start" wrap="nowrap" className={classes.deskTopbar}>
                      <Grid item>
                        <Button color="inherit" component={Link} to="/" className={classes.link}>Home</Button>
                      </Grid>
                      <Grid>
                        <Button color="inherit" component={Link} to="/browse" className={classes.link}>Browse</Button>
                      </Grid>
                      <Grid>
                        <Button color="inherit" component={Link} to="/following" className={classes.link}>Following</Button>
                      </Grid>
                      <Grid>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                }}
                            />
                        </div>
                      </Grid>
                    </Grid>


                    <Grid item>

                      <Grid container direction="row" justify="flex-end" wrap="nowrap">
                      
                              
                        {!this.props.loginState.authenticated && 
                        
                        (<React.Fragment>

                            <Button 
                              color="inherit" 
                              className={classes.link} 
                              onClick={this.handleToggle} 
                              buttonRef={node => {
                                  this.loginEl = node;
                                }}>
                                Login
                            </Button>

                            <Button color="inherit" component={Link} to="/register" variant="contained" className={classes.linkButton}>Sign up</Button>

                          <Menu
                              id="menu-appbar"
                              anchorEl={this.loginEl}
                              getContentAnchorEl={null}
                              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                              transformOrigin={{ vertical: "top", horizontal: "center" }}
                              open={loginOpen}
                              onClose={this.handleClose}
                              MenuListProps={{style: {padding: 0}}}
                          >
                          
                            <Login/>

                          </Menu>

                        </React.Fragment>)}


                        {this.props.loginState.authenticated && (<React.Fragment>

                          <Button color="inherit" className={classes.link} component={Link} to="/dashboard" >Dashboard</Button>
                          <Button color="inherit" variant="contained" className={classes.linkButton} onClick={this.logout}>Logout</Button>

                        </React.Fragment>)
                        
                        
                        }
                      </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
        </div>
    )     
  }
}

const mapStateToProps = state => ({
  loginState: state.login,
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Navbar));