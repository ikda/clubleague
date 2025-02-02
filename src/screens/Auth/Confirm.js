import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../../hooks/useInput";
import HomeScreen from "../HomeScreen";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../../AuthContext";
import AppRoutes from "../../navigators/AppRoutes";
import DetailsScreen from "../DetailsScreen";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export default ({ navigation }) => {
	const confirmInput = useInput("");
	const logIn = useLogIn();
	const [loading, setLoading] = useState(false);
	const [confirmSecretMutation, { data }] = useMutation(CONFIRM_SECRET);
	const handleConfirm = async () => {
		const { value } = confirmInput;
		if (value === "" || !value.includes(" ")) {
			return Alert.alert("Invalid secret");
		}
		try {
			setLoading(true);
			const confirmSecret = confirmSecretMutation({
				variables: {
					secret: confirmInput.value,
					email: navigation.getParam("email")
				}
			});
			secretKey = JSON.stringify(confirmSecret);
			console.log(secretKey);
			if (secretKey !== "" || secretKey !== false) {
				logIn(secretKey);
			} else {
				Alert.alert("Wrong secret!");
			}
		} catch (e) {
			console.log(e);
			Alert.alert("Can't confirm secret");
		} finally {
			setLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput
					{...confirmInput}
					placeholder="Secret"
					returnKeyType="send"
					onSubmitEditing={handleConfirm}
					autoCorrect={false}
				/>
				<AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
			</View>
		</TouchableWithoutFeedback>
	);
};
