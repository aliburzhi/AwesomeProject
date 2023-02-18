import styled from 'styled-components/native'
import {css} from "styled-components";
import {useContext} from "react";
import themeContext from "../config/themeContext";

const PostView = styled.View(({theme}) => {


	return css`
	flex-direction: row;
	padding: 15px;
	border-bottom-width: 1px;
	border-bottom-color: ${theme.color};
	border-bottom-style: solid;
`;

})
const PostImage = styled.Image`
	width: 60px;
	height: 60px;
	border-radius: 12px;
	margin-right: 12px;
`;

const PostTitle = styled.Text`
	font-size: 17px;
	font-weight: 700;
`;

const PostDetails = styled.View`
	flex: 1;
	justify-content: center;
`

const PostDate = styled.Text`
	font-size: 12px;
	margin-top: 2px;
	color: rgba(0,0,0, 0.4);
`;

const truncateTitle = (str) => {
	if (str.length >= 50) {
		return str.substring(0, 50) + '...'
	}

	if (str.length < 50) {
		return str
	}
}

export const Post = ({title, imageUrl, createdAt, style}) => {
	const theme = useContext(themeContext)
	return (
	<PostView theme={theme} >
		<PostImage
			source={{ uri: imageUrl}}
		/>
		<PostDetails>
			<PostTitle style={{backgroundColor: style.background, color: style.color}}>{truncateTitle(title)}</PostTitle>
			<PostDate style={{backgroundColor: style.background, color: style.color}}>{new Date(createdAt).toLocaleDateString()}</PostDate>
		</PostDetails>
	</PostView>)
	}
