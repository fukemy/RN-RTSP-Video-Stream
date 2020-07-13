import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { enableScreens } from 'react-native-screens'
import 'react-native-gesture-handler'

enableScreens()
console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App)