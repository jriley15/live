import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import * as LoginActions from '../actions/loginActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StreamActions from '../actions/streamActions';

const styles = (theme) => ({
    root: {
      //padding: theme.spacing.unit,
      marginTop: theme.spacing.unit * 6
    },

  });

class PageLayout extends React.Component {

  async componentDidMount() {

    if (!this.props.loginState.authenticated) {
      this.props.getAuth();
      
    } else {
      this.props.getMyStream();
    }



  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.children}
      </div>
    )
  }

}



const mapStateToProps = state => ({
  loginState: state.login,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...LoginActions, ...StreamActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PageLayout));