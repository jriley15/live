import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import * as LoginActions from '../actions/loginActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },

    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 300,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,

    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },

});

class Login extends Component {


    state = {
        email: '123@live.com',
        password: '1'
    }

    componentDidMount() {

    }

    login = () => {

        this.props.login(this.state.email, this.state.password);

    }

    handleChange = e => {
 
        this.setState({[e.target.id]: e.target.value});
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.main}>
                <div className={classes.paper}>
                    <Typography variant="h5">
                        Login
                    </Typography>
                    <form autoComplete="off">
                        <TextField
                            id="email"
                            label="Email Address"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleChange}
                            
                        />
                        <TextField
                            id="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.login}
                            disabled={this.props.loginState.loggingIn}
                        >
                            Sign in

                            {this.props.loginState.loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                        
                    </form>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));