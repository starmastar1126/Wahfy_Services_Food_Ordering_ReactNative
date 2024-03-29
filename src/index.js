import React, {Component} from 'react';
import {I18nManager} from 'react-native'
import {store} from '../src/redux/store';
import Navigation from './navigation';
import { Provider } from 'react-redux'


// I18nManager.allowRTL(false)
// I18nManager.forceRTL(false)

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
