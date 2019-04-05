import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import store from './shared/store/store';

import AppContainer from './components/App/AppContainer';

import { getCurrentUser } from './core/modules/authentication.module';
import { initializeProductMocks } from './core/modules/product.module';

import { login, toggleLoading as toggleIsLoadingAuthentication } from './shared/store/actions/authentication.actions';

setCurrentLoggedInUser();

async function setCurrentLoggedInUser() {
  const user = await getCurrentUser();

  if (user) {
    store.dispatch(login(user));
  }
  store.dispatch(toggleIsLoadingAuthentication(false));
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

initializeProductMocks();
