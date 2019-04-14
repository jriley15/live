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
import { basicPost, basicGet } from "../services/apiService";

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
        marginTop: theme.spacing.unit * 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});


class Register extends Component {


    state = {
        email: '',
        username: '',
        password: '',
        confirmpassword: '',
        errors: [],
        success: false
    }

    register = async() => {


        let response = await basicPost('Auth', 'Register', {

            Email: this.state.email,
            Username: this.state.username,
            Password: this.state.password,
            confirmPassword: this.state.confirmpassword

        });

        if (response.success) {

            this.setState({success: true});

        } else {


            this.setState({errors: response.data});

        }


    }

    handleChange = (e) => {

        this.setState({[e.target.id]: e.target.value});

    }


    getErrors(id) {

        let errors = [];

        if (this.state.errors) {
            for (let i = 0; i < this.state.errors.length; i++) {

                if (this.state.errors[i].key.toLowerCase() === id) {
                    return this.state.errors[i].message;
                }
            }
        }

        return errors;

    }

    hasErrors(id) {

        for (let i = 0; i < this.state.errors.length; i++) {
            if (this.state.errors[i].key.toLowerCase() === id)
                return true;
        }

        return false;

    }

    render() {

        const { classes } = this.props;
        
        if (this.state.success) {

            return (
                <div className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        

                    </Paper>
                </div>

            )

        } else {

            
            return (


                <div className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
    
                        {this.hasErrors("*") && (
                            <Typography variant="">

                                {this.getErrors("*")}

                            </Typography>
                        )}

                        <form className={classes.form}>
                            <TextField
                                id="email"
                                label="Email Address"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleChange}
                                error={this.hasErrors("email")}
                                helperText={this.getErrors("email")}
                                
                            />
                            <TextField
                                id="username"
                                label="User name"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.username}
                                onChange={this.handleChange}
                                error={this.hasErrors("username")}
                                helperText={this.getErrors("username")}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                type="password"
                                fullWidth
                                value={this.state.password}
                                onChange={this.handleChange}
                                error={this.hasErrors("password")}
                                helperText={this.getErrors("password")}
                            />
                            <TextField
                                id="confirmpassword"
                                label="Confirm Password"
                                className={classes.textField}
                                margin="normal"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={this.state.confirmpassword}
                                onChange={this.handleChange}
                                error={this.hasErrors("confirmpassword")}
                                helperText={this.getErrors("confirmpassword")}
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
                                value={this.state.email}
                                onClick={this.register}
                            >
                                Submit
                            </Button>
                        </form>
                    </Paper>

                </div>
            )
        }
    }
}


export default withStyles(styles)(Register);