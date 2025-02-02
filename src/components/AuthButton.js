import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
background-color: ${props => props.theme.blueColor}
	padding: 10px;
	margin: 0 50px;
	border-radius: 4px;
	width: ${constants.width / 1.7};
  `;
const Text = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading = false }) => (
	<Touchable disabled={loading} onPress={onPress}>
		<Container>
			{loading ? <ActivityIndicator /> : <Text>{text}</Text>}
		</Container>
	</Touchable>
);

AuthButton.propsTypes = {
	loading: PropTypes.bool,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};

export default AuthButton;
