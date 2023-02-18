import React from "react";
import styled from "styled-components/native";
import {ActivityIndicator, Alert, Text, View} from "react-native";
import axios from "axios";
import {Loading} from "../components/Loading";

const PostImage = styled.Image`
border-right: 10px;
	width: 100%;
	height: 250px;
	margin-bottom: 20px;
`;

const PostText = styled.Text`
	font-size: 18px;
	line-height: 24px;

`;
export const FullPostScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [data, setData] = React.useState();
	const {id, name} = route.params;

	React.useEffect(() => {
		navigation.setOptions({
			title: name
		});
		axios.get(`https://63eff8f7271439b7fe78f424.mockapi.io/articles/${id}`)
			.then(({data}) => {
				setData(data)
			}).catch(error => {
			console.log(error)
			Alert.alert('Can`t get article')
		}).finally(() => setIsLoading(false))
	}, [])

	if(isLoading) {
		return <Loading />
	}

	return (
		<View style={{padding: 20}}>
			<PostImage source={{uri: data.avatar}} />
			<PostText>
				{name}
			</PostText>
		</View>
	)
}
