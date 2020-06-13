import React from 'react';
import Routes from './src/pages/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from '@expo-google-fonts/roboto';

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<NavigationContainer>
			<Routes />
		</NavigationContainer>
	);
}

export default App;