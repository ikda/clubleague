import React from "react";
import { View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";
import AuthNavigation from "../navigators/AuthNavigation";
import AppRoutes from "../navigators/AppRoutes";

export default () => {
	//for test user have login state
	// const isLoggedIn = true;

	//below 3lines are active auth control which means user have logout state.
	const isLoggedIn = useIsLoggedIn();
	const logIn = useLogIn();
	const logOut = useLogOut();
	return (
		<View style={{ flex: 1 }}>
			{isLoggedIn ? <AppRoutes /> : <AuthNavigation />}
		</View>
	);
};
