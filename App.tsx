import React from 'react';
import Routes from './src/pages/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from '@expo-google-fonts/roboto';

import Theme from './src/configs/theming';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<NavigationContainer theme={Theme}>
			<StatusBar barStyle="light-content" backgroundColor="#121214" />
			<ThemeProvider theme={Theme}>
				<Routes />
			</ThemeProvider>
		</NavigationContainer>
	);
}

export default App;