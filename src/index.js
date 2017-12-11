import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';
import registerSW from './registerServiceWorker';

import { getConfig, getGenres, getLanguage } from './actions';

// initial actions
Promise.all([ 
    store.dispatch(getLanguage()), 
    store.dispatch(getConfig())
]).then(_ => store.dispatch(getGenres()));

function startApp() {
    render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>, 
        document.getElementById('root')
    );
    registerSW();
}

if (module.hot) {
    module.hot.accept('./App.js', () => {
      // Require the new version and render it    
      startApp();
    });
  }

if (APP_ENV === 'hybrid') {
    document.addEventListener('deviceready', startApp);
} else {
    document.addEventListener('DOMContentLoaded', startApp);
}
