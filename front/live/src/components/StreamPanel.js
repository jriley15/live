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
import Button from '@material-ui/core/Button';
import * as StreamActions from '../actions/streamActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
      display: 'flex',
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

  
class StreamPanel extends Component {

    state = {

        myStream: {},
        madeChanges: false

    };

    handleStreamChange = e => {

        this.setState({madeChanges: true, myStream: {...this.state.myStream, [e.target.id]: e.target.value}});

    }

    async componentDidMount() {

        this.initStreamPanel();
    
    }

    componentDidUpdate(prevProps, prevState) {


        if (prevProps.loginState.authenticated !== this.props.loginState.authenticated) {
            this.initStreamPanel();
        }

    }

    async initStreamPanel() {

        this.setState({madeChanges: false, myStream: this.props.streamState.myStream});  

        await this.props.getMyStream();

        this.setState({madeChanges: false, myStream: this.props.streamState.myStream});   
    }


    render() {

        const { myStream, madeChanges } = this.state;
        
        const { classes } = this.props;

        return (
            <Grid container direction="column">

                <Grid item>
                    <Typography variant="h5" gutterBottom>
                        Stream Information
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                    <TextField
                        id="title"
                        label="Stream Title"
                        placeholder="Placeholder"
                        value={myStream.title || "loading.."}
                        onChange={this.handleStreamChange}
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                    <TextField
                        id="description"
                        label="Description"
                        placeholder=""
                        value={ myStream.description || "loading.."}
                        onChange={this.handleStreamChange}
                        multiline
                        rows="4"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={10} md={8}>
                    <Typography variant="body2" gutterBottom>
                        Server URL: rtmp://stream.jrdn.tech:1935/app
                    </Typography>
                    
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Stream key"
                        //defaultValue="test"
                        value={ myStream.key || "loading.."}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><KeyIcon/></InputAdornment>
                        }}
                        fullWidth
                    />
                    <Typography paragraph gutterBottom>
                        Use this key in OBS
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Typography variant="body1" gutterBottom>
                        Example
                    </Typography>
                    
                    <img src="https://live.jrdn.tech/images/example.png" style={{maxWidth: '100%'}}/>
                        
                </Grid>
                <Grid item>
                    {madeChanges && <Button color="primary" variant="contained">Save Changes</Button>}
                </Grid>

            </Grid>
        )
    }
}   

const mapStateToProps = state => ({
    streamState: state.stream,
    loginState: state.login
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(StreamActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StreamPanel));