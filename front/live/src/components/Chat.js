import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as signalR from "@aspnet/signalr";
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Button, IconButton, Drawer } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';
import { api } from '../services/apiService';
import * as LoginActions from '../actions/loginActions';

const styles = theme => ({
    root: {
      //padding: theme.spacing.unit


      height: 'calc(100vh - '+ theme.spacing.unit * 6 +'px)',
      backgroundColor: grey[200],
      borderLeft: '1px solid ' + grey[300],
      
    },
    inline: {
        display: 'inline',
    },

    msgBox: {
        padding: theme.spacing.unit / 2
    },

    messageContainer: {

        height: 'calc(100vh - '+ ((theme.spacing.unit * 6) + 135) + 'px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingLeft: theme.spacing.unit / 2,
        paddingTop: theme.spacing.unit
    },
    message: {
        lineHeight: '1.5'
    }



});

class Chat extends Component {



    constructor(props) {

        super(props);

        this.state = {
            messages: [],
            message: ''
        };

        this.messagesEnd = React.createRef();

    }
    

    componentDidMount() {

        //this.scrollToBottom();
        //this.initChatRoom();
        this.initChatRoom();
    }

    componentWillUnmount() {
        if (this.connection) {
            this.connection.stop();
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.chatRoomId !== this.props.chatRoomId) {

            this.initChatRoom();

        } else if (prevProps.loginState.authenticated !== this.props.loginState.authenticated) {

            this.initChatRoom();
            
        }

    }

    initChatRoom = () => {
        if (this.props.chatRoomId > 0) {
            if (this.connection) {
                this.connection.stop();
            }
            const me = this;
            const chatRoomId = this.props.chatRoomId;

            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(api + "/chat", { accessTokenFactory: () => this.props.loginState.authToken })
                //.configureLogging(signalR.LogLevel.Information)
                .build();

            this.connection.start().then(() => {
                console.log("connected");
                this.connection.invoke("Join", chatRoomId);

                //this.connection.invoke("Watch", this.props.chatRoom.streamId);
            });

            this.connection.on("Messages", (messages) => {

                this.setState({messages: messages});
                this.scrollToBottom('auto');
            });

            this.connection.on("Message", (message) => {

                this.setState({messages: [...this.state.messages, message]});
                this.scrollToBottom('smooth');
            });


        }
    }


    scrollToBottom = (behavior) => {

        if (this.messagesEnd.current)
            this.messagesEnd.current.scrollIntoViewIfNeeded({behavior: behavior});//({ behavior: 'smooth' })

    }

    sendMessage = () => {

        if (this.connection && this.props.loginState.authenticated) {
            this.connection.invoke("SendMessage", this.props.chatRoomId, this.state.message);

        }
        this.setState({message: ''});
    }

    handleChange = e => {

        this.setState({[e.target.id]: e.target.value});

    }

    textValue = () => {
        if (!this.props.loginState.authenticated) {
            return "You must be logged in to send a message";
        }
        return this.state.message;
    }

    render() {

        const { classes } = this.props;

        const { messages } = this.state;

        return (
            <Grid container direction="column" className={classes.root} justify="space-between">
                <Grid item className={classes.messageContainer}>
                    
                    <Grid container direction="column" spacing={8}>
                    
                        {messages.map(message => (

                            <Grid item key={message.chatMessageId}>

                                <Typography variant="subtitle1" className={classes.message}>
                                    <b>{message.user.username}</b>: {message.message}
                                </Typography>

                            </Grid>

                        ))}  
                        
                    </Grid> 

                    
                    <div ref={this.messagesEnd} />
                    

                </Grid>

                <Grid item className={classes.msgBox}>
                    
                    <TextField
                        id="message"
                        label="Send Message"
                        value={this.textValue()}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows="2"
                        disabled={!this.props.loginState.authenticated}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.sendMessage();
                                ev.preventDefault();
                            }
                        }}
                    />
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <IconButton aria-label="Options">
                            <SettingsIcon fontSize="small" />
                        </IconButton>

                        <Button color="primary" variant="contained" onClick={this.sendMessage}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        
        )

    }

}



const mapStateToProps = state => ({
    loginState: state.login,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));