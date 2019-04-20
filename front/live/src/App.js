import React from 'react';
import { Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageLayout from './components/PageLayout';
import Browse from './components/Browse';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Stream from './components/Stream';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

const App = (props) => (
    <React.Fragment>

      <CssBaseline />

      <Navbar/>

      <PageLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/stream" render={(props) => <Dashboard {...props} panel="stream"/>} />
          <Route exact path="/dashboard/profile" render={(props) => <Dashboard {...props} panel="profile"/>} />

          <Route exact path="/stream/:id" component={Stream} />

        </Switch>
      </PageLayout>
      
    </React.Fragment>

);

export default withStyles(styles)(App);