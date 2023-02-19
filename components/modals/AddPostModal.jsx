import {Alert, Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useContext, useState} from "react";
import themeContext from "../../config/themeContext";

export const AddPostModal = ({active, setActive, children, onSubmit}) => {
	const theme = useContext(themeContext)
	const [text, onChangeText] = useState('');
	const makeId = (length) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	};

	const handleSubmit = () => {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;

		const newPost = {
			createdAt: today,
			name: text,
			avatar: "https://static.thenounproject.com/png/55168-200.png",
			id: makeId(10),
		}
		onSubmit(newPost)
		setActive(false)
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={active}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setActive(false);
			}}>
			<View style={styles.centeredView}>
				<View style={[styles.modalView, {backgroundColor: theme.background}]}>
					<TextInput
						clearButtonMode="while-editing"
						style={
							[styles.input, {
								backgroundColor: theme.background,
								color: theme.color,
								borderBottomColor: 'tomato',
								borderTopColor: 'tomato',
								borderLeftColor: 'tomato',
								borderRightColor: 'tomato'
							}]
						}
						placeholder="Type Author name..."
						placeholderTextColor={theme.color}
						onChangeText={onChangeText}
						value={text}
					/>
					{children}
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={handleSubmit}>
						<Text style={styles.textStyle}>Submit</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	)
}
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		padding: 0
	},
	modalView: {
		width: '100%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		paddingTop: 35,
		paddingBottom: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	input: {
		width: '50%'
	}
});
