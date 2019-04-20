import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import * as StreamActions from '../actions/streamActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Chat from './Chat';
import { basicPost, basicGet } from "../services/apiService";
import Hls from 'hls.js';

const styles = theme => ({
    root: {
      //padding: theme.spacing.unit

      paddingLeft: theme.spacing.unit,
      
    },

    main: {
        paddingTop: theme.spacing.unit,
        width: 'calc(100% - 300px - ' + theme.spacing.unit + 'px)',

        [theme.breakpoints.down('xs')]: {
            minWidth: 'calc(100% - ' + theme.spacing.unit + 'px)',
          },

         
    },

    chat: {


      width: 'calc(100% - '+ theme.spacing.unit +'px)',

      [theme.breakpoints.up('sm')]: {
        width: '300px',
      },  
    },

    player: {
        width: '100%',
        maxHeight: 'calc(100vh - 160px)'
    },

});

class Stream extends Component {


    componentDidMount() {

        this.props.getStream(this.props.match.params.id);

        basicPost("Streams", "ViewStream", this.props.match.params.id);

        //basicGet("Streams", "Onwatch", {id: this.props.match.params.id});

        let me = this;
        if (Hls.isSupported()) {
            var video = document.getElementById('live');
            const hls = new Hls();
            // bind them together
            hls.attachMedia(video);
            video.play();

            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
              console.log("video and hls.js are now bound together !");
              hls.loadSource("https://live.jrdn.tech/live/"+me.props.match.params.id+"/index.m3u8");
              hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log("manifest loaded, found " + data.levels.length + " quality level");
              });
            });

            this.hls = hls;
        }

        this.streamUpdateInterval = setInterval(() => {
            
            this.props.getStream(this.props.match.params.id);

        }, 5000);

    }

    componentWillUnmount() {

        //basicGet("Streams", "OnWatchDone", {id: this.props.match.params.id});


        if (this.hls) {
            this.hls.destroy();
        }


        clearInterval(this.streamUpdateInterval);

    }




    render() {

        const { classes, streamState } = this.props;

        const { stream } = streamState;

        const { user, chatRoom } = stream;

        return (
            <div className={classes.root}>
                
                <Grid container justify="space-between" >

                    <Grid item className={classes.main}>

                        <Typography variant="h4">

                                {stream.title}

                        </Typography>

                        <Grid container justify="center" >
                            <Grid item xs={12}>
                                <video id="live" controls className={classes.player}>
                                
                                </video>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-between" >

                            <Grid item>


                                <Typography variant="h6">

                                    {user && stream.user.email}

                                </Typography>

                                <Typography variant="body1">

                                    {stream.description}

                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" align="right">

                                    Views: {stream.views}

                                </Typography>
                                <Typography variant="h6" align="right">

                                    Viewers: {stream.viewers}

                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item className={classes.chat}>
                    
                        <Chat chatRoomId={this.getId(chatRoom)} />

                    </Grid>



                </Grid>



            </div>
        )

    }

    getId(chatRoom) {
        if (chatRoom) {
            return chatRoom.chatRoomId;
        }
        return 0;
    }

}




const mapStateToProps = state => ({
    streamState: state.stream,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(StreamActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stream));