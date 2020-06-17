import React from 'react';
import Routes from './src/pages/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
	Roboto_300Light
} from '@expo-google-fonts/roboto';

import Theme from './src/configs/theming';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from '~/store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_300Light,
		Roboto_700Bold
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<NavigationContainer theme={Theme}>
			<StatusBar barStyle="light-content" backgroundColor="#121214" />
			<ThemeProvider theme={Theme}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Routes />
					</PersistGate>
				</Provider>
			</ThemeProvider>
		</NavigationContainer>
	);
}

export default App;