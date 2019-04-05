import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});


class Register extends Component {


  render() {

    const { classes } = this.props;

    return (


        <div className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <TextField
                        id="outlined-name"
                        label="Email Address"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="Confirm Password"
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="I accept the Terms & Conditions"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>

        </div>

        
    )
  }
}


export default withStyles(styles)(Register);