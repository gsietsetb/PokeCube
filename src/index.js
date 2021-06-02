/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {isWeb} from './style/gStyles';

AppRegistry.registerComponent(appName, () => App);
isWeb &&
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
  });
