import { createStackNavigator} from "react-navigation-stack";
import React from "react";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import FiltersScreen from '../screens/FiltersScreen';
import { Platform } from "react-native";
import colors from "../constants/colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import { Ionicons } from "@expo/vector-icons";

// setting default stack nav styling
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primaryColor,
  headerTitle: 'A Screen'
};
//takes at least 1 args, JS object config different screens wanting to move between. Screens registered by key value pairs (porperty name of choice: value as pointer or object to allow more config)
// Any component mapped to navigator have special prop
const MealsNavigator = createStackNavigator({
  Categories: {screen: CategoriesScreen },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen,
}, {
    // allows you to set up options which apply to every screen
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS ==='android' ? colors.primaryColor : 'red'
        },
        headerTintColor: Platform.OS ==='android' ? '#fff': colors.secondaryColor
    }
    }
);
// oject being passed defines all screens within stack
const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen,
},{
  defaultNavigationOptions: defaultStackNavOptions
});

// Multiple forms of navigation, using meals navigator function to add tabs to all screens(first arg tab config) associated (second arg nav config)
const MealsFavNavigator = createBottomTabNavigator({
    Meals: {screen: MealsNavigator,
    navigationOptions: {
      // function that recieves tab information (arg) and returns desired icon render
      tabBarIcon: (tabInfo) => {
        return <Ionicons name= 'ios-menu-outline' size= {25} color={tabInfo.tintColor} />;
      }
    }},
    Favorites: {screen: FavNavigator,
      navigationOptions: {
        // function that recieves tab information (arg) and returns desired icon render
        tabBarIcon: (tabInfo) => {
          return <Ionicons name= 'heart-outline' size= {25} color={tabInfo.tintColor} />;
        }
      }}},{
// tab bar options used to control how the tab bar is styled
      tabBarOptions: {
        activeTintColor: colors.secondaryColor
      }
    }
);
// stack navigator for filter screen navigation
const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}
,{
  defaultNavigationOptions: defaultStackNavOptions
});

//Main navigator, burger side menu takes two args (1st the config and 2nd)
const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
},
{
  contentOptions: {
    activeTintColor: colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});


// wrap root with create app container frm react navigation, Meals fav nav become root because meals nav nested within function
export default createAppContainer(MainNavigator);