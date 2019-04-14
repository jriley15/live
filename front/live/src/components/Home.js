import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';
import * as StreamActions from '../actions/streamActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {

    padding: theme.spacing.unit,
    
  },

  stream: {
    
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '200px',
    },

    padding: theme.spacing.unit,

    transition: 'all .2s ease-in-out',


    '&:hover': {

      transform: 'scale(1.2)'
      
    },

    textDecoration: 'none'



  },

  image: {
    width: '95%'
  },

  live: {
    margin: theme.spacing.unit,
    color: 'red',
    border: '1px solid red',
    borderRadius: '5px',
    padding: theme.spacing.unit / 3
  }

});

class Home extends React.Component {


  
  componentDidMount() {

    
    this.props.getStreams();

  }


  render() {

    const { classes, streamState } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h2" gutterBottom align="center">
          Welcome to YarbTV
        </Typography>

        <Grid container justify="space-evenly" alignItems="center" spacing={16}>
        
          {streamState.streams.map((stream) => (

            <Grid item key={stream.streamId} className={classes.stream} component={Link} to={ "/stream/" + stream.streamId }>
            
              <Grid container direction="column" alignItems="center" spacing={8}>
              
                <Typography variant="body1" gutterBottom align="center">
                  {stream.title} {stream.streaming && (
                    <Typography variant="overline" inline className={classes.live}>
                      Live
                    </Typography>
                  )}
                </Typography>
                <img src={stream.streaming ? "http://192.168.1.17:8080/thumbnails/"+stream.streamId+".png" : "https://multimedia.europarl.europa.eu/o/europarltv-theme/images/europarltv/media-default-thumbnail-url-video.png"} className={classes.image} />
                <Typography variant="body1" gutterBottom align="center">

                  {stream.streaming && stream.viewers + " watching"}
                  {!stream.streaming && stream.views + " views"}

                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  {stream.user.email}
                </Typography>


              </Grid>
            </Grid>

          ))}
        
        
        </Grid>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  streamState: state.stream,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(StreamActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));