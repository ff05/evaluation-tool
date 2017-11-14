import React, { Component } from 'react';
import GroupList from './containers/GroupList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'
import AppBar from 'material-ui/AppBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar />
          <GroupList />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
