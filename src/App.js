import React, { Component } from 'react';
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'
import Navigation from './components/UI/Navigation'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
            <Navigation />
            <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
