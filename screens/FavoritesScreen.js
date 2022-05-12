import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";
import MealList from "../components/MealList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";



const FavoritesScreen = props => {
    
  // useSelector selects a slice of state to use in a component, part of redux package. takes a function that gets state as arg and return data from that state accesing prop (favoriteMeals)
  const favMeals = useSelector(state => state.meals.favoriteMeals);

  // if no favorites
    if (favMeals.length === 0 || !favMeals){
      return (
        <View style={styles.noFav}>
          <DefaultText>
            No Favorites found. Please add to your favorites!
          </DefaultText>
        </View>
      );
    }
 
    // render Flatlist which then renders meal items selected as favorites. navigation needed bc navigation prop is only available in component that is directlyloaded through a navigator
    return <MealList listData={favMeals} navigation={props.navigation} />;

};

// react navigation special prop, check docs for available options, Platform reaact native feature for identifying OS and allowing for different styling
FavoritesScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Favorite Meals',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    };
  };

  const styles = StyleSheet.create({
    noFav: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default FavoritesScreen;


