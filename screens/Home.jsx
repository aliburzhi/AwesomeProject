import axios from "axios";
import React, {useContext, useState} from "react";
import {Alert, Button, FlatList, RefreshControl, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {EventRegister} from "react-native-event-listeners";
import styled from "styled-components/native";
import {Post} from "../components/Post";
import themeContext from "../config/themeContext";
import {Loading} from "../components/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddPostModal} from "../components/modals/AddPostModal";


const Wrapper = styled.View`
	height: 100%;
	width: 100%;
`;

export const HomeScreen = ({navigation}) => {
	const theme = useContext(themeContext)
	const [isLoading, setIsLoading] = useState(false);
	const [articles, setArticles] = useState([]);
	const [mode, setMode] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const fetchPosts = () => {
		setIsLoading(true)
		Alert.alert('0 new articles');
		setIsLoading(false)
		// setIsLoading(true)
		// axios.get('https://63eff8f7271439b7fe78f424.mockapi.io/articles')
		// 	.then(({data}) => {
		// 		setArticles(data)
		// 	}).catch(error => {
		// 	console.log(error)
		// 	Alert.alert('Wrong address')
		// }).finally(() => setIsLoading(false))
	};

	React.useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			const jsonValue = await AsyncStorage.getItem('articles')
			if (!jsonValue) {
				axios.get('https://63eff8f7271439b7fe78f424.mockapi.io/articles')
					.then(({data}) => {
						AsyncStorage.setItem('articles', JSON.stringify(data));
						setArticles(data)
						setIsLoading(false)
					}).catch(e => {
					Alert.alert(e)
				});
			} else {
				const data = JSON.parse(jsonValue)
				setArticles(data)
				setIsLoading(false)
			}
		}

		void fetchData()
	}, [])


	if (isLoading) {
		return <Loading/>
	}

	const makeId = (length) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	};
	// const handleAddPost = async () => {
	// 	if (text.trim().length > 1) {
	// 		let today = new Date();
	// 		let dd = String(today.getDate()).padStart(2, '0');
	// 		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	// 		let yyyy = today.getFullYear();
	// 		today = mm + '/' + dd + '/' + yyyy;
	// 		const newPost = {
	// 			createdAt: today,
	// 			name: text,
	// 			avatar: "https://static.thenounproject.com/png/55168-200.png",
	// 			id: makeId(10),
	// 		}
	// 		await AsyncStorage.setItem('articles', JSON.stringify([newPost, ...articles]));
	// 		setArticles([newPost, ...articles])
	// 	} else {
	// 		Alert.alert("Please add title (min 2 symbols)")
	// 	}
	// }

	const addPostModal = async (value) => {
		await AsyncStorage.setItem('articles', JSON.stringify([value, ...articles]));
		setArticles([value, ...articles])
	}

	const handleDeletePost = async (id) => {
		console.log(id)
		const jsonValue = await AsyncStorage.getItem('articles')
		const articles = JSON.parse(jsonValue)
		const newArticlesList = articles.filter((item) => item.id !== id);
		await AsyncStorage.setItem('articles', JSON.stringify(newArticlesList));
		setArticles(newArticlesList);
	}

	return (
		<Wrapper style={[{backgroundColor: theme.background, color: theme.color}]}>
			<Button title="Add Post" onPress={() => setModalActive(true)}/>
			<AddPostModal active={modalActive} setActive={setModalActive} onSubmit={addPostModal}/>
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
				data={articles}
				renderItem={({item}) => (
					<TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id, name: item.name})}>
						<View>
							<Post
								style={{color: theme.color, background: theme.background}}
								title={item.name}
								imageUrl={item.avatar}
								createdAt={item.createdAt}>
								<Button title="Delete" onPress={() => handleDeletePost(item.id)}/>
							</Post>
						</View>
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
