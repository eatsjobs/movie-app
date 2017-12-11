import React from 'react';

import {
  Navigator
} from 'react-onsenui';

import Home from './containers/Home.jsx';

/**
 * This function takes a `route` object as
 * an argument and uses it to render
 * the corresponding page.
 */
const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} hasBackButton={route.hasBackButton} />
);

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{ component: Home, key: 'MAIN_PAGE', hasBackButton: false }}
  />
);

export default App;