import axios from "axios";
import React, {useContext} from "react";
import {
	Alert,
	FlatList,
	RefreshControl,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import {EventRegister} from "react-native-event-listeners";
import styled from "styled-components/native";
import {Loading} from "../components/Loading";
import {Post} from "../components/Post";
import themeContext from "../config/themeContext";


const Wrapper = styled.View`
	height: 100%;
	width: 100%;
`;

export const HomeScreen = ({navigation}) => {
	const theme = useContext(themeContext)
	const [isLoading, setIsLoading] = React.useState(true);
	const [items, setItems] = React.useState();
	const [mode, setMode] = React.useState(false);
	const [text, onChangeText] = React.useState('Useless Text');
	const fetchPosts = () => {
		setIsLoading(true)
		axios.get('https://63eff8f7271439b7fe78f424.mockapi.io/articles')
			.then(({data}) => {
				setItems(data)
			}).catch(error => {
			console.log(error)
			Alert.alert('Wrong address')
		}).finally(() => setIsLoading(false))
	};

	React.useEffect(() => {
		fetchPosts()
	}, [])

	if (isLoading) {
		return <Loading/>
	}

	return (
		<Wrapper style={[{backgroundColor: theme.background, color: theme.color}]}>
			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={text}
			/>
			<Text style={[{color: theme.color}]}>Theme mode:</Text>
			<View style={{display: 'flex', width: '100%', flexDirection: 'row'}}>
				<Text>Light</Text>
				<Switch value={mode} onValueChange={(value) => {
					setMode(value)
					EventRegister.emit("changeTheme", value)
				}}/>
				<Text>Dark</Text>
			</View>
			<FlatList
				refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
				data={items}
				renderItem={({item}) => (
					<TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id, name: item.name})}>
						<Post style={{color: theme.color, background: theme.background}} title={item.name} imageUrl={item.avatar}
									createdAt={item.createdAt}/>
					</TouchableOpacity>
				)}
			/>
		</Wrapper>
	);
}
const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
