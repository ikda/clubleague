import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import NoticeScreen from "../screens/NoticeScreen";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import DetailsScreen from "../screens/DetailsScreen";

class AppRoutes extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: {
    screen: DetailsScreen,
    navigationOptions: () => ({
      title: "Detail for clubhouse",
    }),
  },
});

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
});

const NoticeStack = createStackNavigator({
  Notice: NoticeScreen,
});

const ProfileStack = createStackNavigator({
  Prifile: ProfileScreen,
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: () => ({
      title: "EditProfile",
    }),
  },
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions:{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Feather name="home" color={tintColor} size={24} />
          )
        }
      },
      Feed: {
        screen: FeedStack,
        navigationOptions: {
          tabBarLabel: 'Feed',
          tabBarIcon: ({tintColor}) => (
            <MaterialCommunityIcons name="soccer-field" color={tintColor} size={24} />
          )
        }
      },
      Notice: {
        screen: NoticeStack,
        navigationOptions: {
          tabBarLabel: 'Notice',
          tabBarIcon: ({tintColor}) => (
            <Feather name="bell" color={tintColor} size={24} />
          )
        }
      },
      Profile: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({tintColor}) => (
            <Feather name="user" color={tintColor} size={24} />
          )
        }
      },

    },
    {
      tabBarOptions: {
        activeTintColor: '#34A853',
        inactiveTintColor: 'grey',
        style: {
          backgroundColor: '#FAFAFA',
          borderTopWidth: 0,
          shadowOffset: {width:5,height:3},
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5
        }
      }
    }
  )
);
