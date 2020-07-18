import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AuthNav} from './AuthNav';
import { DrawerNav } from './DrawerNav';
import { MainStack } from './MainStack';

const rootNavigator = createSwitchNavigator({
  AuthNav: {screen: AuthNav},
  MainStack:{screen: MainStack},
});

export default createAppContainer(rootNavigator);
