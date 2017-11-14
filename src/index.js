import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConnectedRouter as Router } from 'react-router-redux'
import { Provider } from 'react-redux'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
