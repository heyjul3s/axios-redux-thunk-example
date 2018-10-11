import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { default as Footer, default as Header } from './containers/header/index';
import Home from './containers/home/index';
import './index.css';
import * as serviceWorker from './registerServiceWorker';
import configureStore from './store';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact={true} path="/" component={Home} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
