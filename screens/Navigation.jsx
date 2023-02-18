import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./Home";
import {FullPostScreen} from "./FullPost";
import {EventRegister} from "react-native-event-listeners";
import {useEffect, useState} from "react";
import themeContext from "../config/themeContext";
import theme from "../config/theme";
const Stack = createNativeStackNavigator();

export const Navigation = () => {
	const [mode, setMode] = useState(false)

	useEffect(() => {
		let eventListener = EventRegister.addEventListener(
			"changeTheme",
			(data) => {
			setMode(data);
		});
		return () => {
			EventRegister.removeEventListener(eventListener)
		}
	});

	return (
		<themeContext.Provider value={mode === true ? theme.dark : theme.light}>
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} options={{title: 'Новости'}} />
				<Stack.Screen name="FullPost" component={FullPostScreen} options={{title: 'Статья'}} />
			</Stack.Navigator>
		</NavigationContainer>
		</themeContext.Provider>
	)
}
