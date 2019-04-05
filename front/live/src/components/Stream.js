import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import * as StreamActions from '../actions/streamActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Chat from './Chat';
import { basicPost } from "../services/apiService";

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

                        <video controls className={classes.player}>
                            <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4" />
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