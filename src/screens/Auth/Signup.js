import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Google from "expo-google-app-auth";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const GoogleContainer = styled.View`
	margin-top: 20px;
`;

export default ({ navigation }) => {
	const fNameInput = useInput("");
	const lNameInput = useInput("");
	const emailInput = useInput(navigation.getParam("email", ""));
	const usernameInput = useInput("");
	const [loading, setLoading] = useState(false);
	const createAccountMutation = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: usernameInput.value,
			email: emailInput.value,
			firstName: fNameInput.value,
			lastName: lNameInput.value
		}
	});
	const handleSingup = async () => {
		const { value: email } = emailInput;
		const { value: fName } = fNameInput;
		const { value: lName } = lNameInput;
		const { value: username } = usernameInput;
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(email)) {
			return Alert.alert("That email is invalid");
		}
		if (fName === "") {
			return Alert.alert("I need your name");
		}
		if (username === "") {
			return Alert.alert("Invalid username");
		}
		try {
			setLoading(true);
			const {
				data: { createAccount }
			} = await createAccountMutation();
			if (createAccount) {
				Alert.alert("Account created", "Log in now!");
				navigation.navigate("Login", { email });
			}
		} catch (e) {
			console.log(e);
			Alert.alert("Username taken.", "Log in instead");
			navigation.navigate("Login", { email });
		} finally {
			setLoading(false);
		}
	};
	const googleLogin = async () => {
		const GOOGLE_ID =
			"1022953737395-6hgj421t50d3ber6hcpso2sjlf35pabn.apps.googleusercontent.com";
		try {
			setLoading(true);
			const result = await Google.logInAsync({
				androidClientId: GOOGLE_ID,
				scopes: ["profile", "email"]
			});
			if (result.type === "success") {
				const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
					headers: { Authorization: `Bearer ${result.accessToken}` }
				});
				const { email, family_name, given_name } = await user.json();
				updateFormData(email, given_name, family_name);
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};
	const updateFormData = (email, firstName, lastName) => {
		emailInput.setValue(email);
		fNameInput.setValue(firstName);
		lNameInput.setValue(lastName);
		const [username] = email.split("@");
		usernameInput.setValue(username);
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput
					{...fNameInput}
					placeholder="First name"
					autoCapitalize="words"
				/>
				<AuthInput
					{...lNameInput}
					placeholder="Last name"
					autoCapitalize="words"
				/>
				<AuthInput
					{...emailInput}
					placeholder="Email"
					keyboardType="email-address"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthInput
					{...usernameInput}
					placeholder="Username"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthButton loading={loading} onPress={handleSingup} text="Sign up" />
				<GoogleContainer>
					<AuthButton
						bgColor={"#EE1922"}
						loading={false}
						onPress={googleLogin}
						text="Connect Google"
					/>
				</GoogleContainer>
			</View>
		</TouchableWithoutFeedback>
	);
};
