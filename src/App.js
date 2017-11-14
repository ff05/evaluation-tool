import React, { Component } from 'react';
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'
import AppBar from 'material-ui/AppBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar />
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
