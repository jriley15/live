import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyIcon from '@material-ui/icons/VpnKey';
import LiveIcon from '@material-ui/icons/LiveTv';
import AccountIcon from '@material-ui/icons/AccountCircle';
import StreamPanel from './StreamPanel';
import ProfilePanel from './ProfilePanel';
import { Link } from 'react-router-dom';


const drawerWidth = 180;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: 60,
    flexShrink: 0,

    [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },

  },
  drawerPaper: {
    width: 60,


    [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: {

    minHeight: theme.spacing.unit * 6
  },//theme.mixins.toolbar,

  textField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    maxWidth: '400px'
  },

  listItemText: {

    display: 'none',

    [theme.breakpoints.up('sm')]: {
        display: 'flex'
      },
  }


});

class Dashboard extends Component {


    state = {



    };

    render() {

        const { classes, panel } = this.props;

        

        return (



            <div className={classes.root}>

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem button key={1} component={Link} to="/dashboard/stream">
                            <ListItemIcon><LiveIcon /></ListItemIcon>
                            <ListItemText primary="Stream" className={classes.listItemText} />
                        </ListItem>
                        <ListItem button key={2} component={Link} to="/dashboard/profile">
                            <ListItemIcon><AccountIcon /></ListItemIcon>
                            <ListItemText primary="Profile" className={classes.listItemText} />
                        </ListItem>
                    </List>

                </Drawer>

                <main className={classes.content}>

                    {(panel === "stream" || !panel) &&  <StreamPanel />}

                    {panel === "profile" &&  <ProfilePanel/>}


                </main>

            </div>




        )
    }



}

export default (withStyles(styles)(Dashboard));