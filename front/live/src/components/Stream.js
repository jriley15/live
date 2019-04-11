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

    player: {
        width: '100%',

    },

});

class Stream extends Component {


    componentDidMount() {

        this.props.getStream(this.props.match.params.id);

        basicPost("Streams", "ViewStream", this.props.match.params.id);

        basicGet("Streams", "Onwatch", {id: this.props.match.params.id});
        let me = this;
        if (Hls.isSupported()) {
            var video = document.getElementById('live');
            var hls = new Hls();
            // bind them together
            hls.attachMedia(video);
            video.play();

            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
              console.log("video and hls.js are now bound together !");
              hls.loadSource("http://98.171.80.97:8080/live/"+me.props.match.params.id+"/index.m3u8");
              hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log("manifest loaded, found " + data.levels.length + " quality level");
              });
            });
        }

    }

    componentWillUnmount() {

        basicGet("Streams", "OnWatchDone", {id: this.props.match.params.id});

    }




    render() {

        const { classes, streamState } = this.props;

        const { stream } = streamState;

        const { user, chatRoom } = stream;

        return (
            <div className={classes.root}>
                
                <Grid container direction="row" justify="space-between" >

                    <Grid item className={classes.main}>

                        <Typography variant="h4">

                                {stream.title}

                        </Typography>

                        <video id="live" controls className={classes.player}>
                           
                        </video>

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


                    <Grid item>
                    
                        <Chat chatRoom={chatRoom} />

                    </Grid>



                </Grid>



            </div>
        )

    }

}


const mapStateToProps = state => ({
    streamState: state.stream,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(StreamActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stream));