import React from "react";
import MealList from "../components/MealList";
import { View, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";



const CategoryMealsScreen = (props) => {
 
  // extract desired param through react navigation
  const catId = props.navigation.getParam("categoryId");

  // useSelector selects a slice of state to use in a component, part of redux package. takes a function that gets state as arg and return data from that state
  const availableMeals = useSelector(state => state.meals.filteredMeals);

  // find meals based on user selection (return true if equal to matching meal by cat id, false if not)
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
  // if no meals displayed retrun msg
  if (displayedMeals.length === 0){
    return <View style= {styles.noMeals}>
      <DefaultText>
        Sorry nothing to display here, check your filtered settings
      </DefaultText>
    </View>

  }
    // render Flatlist which then renders meal items 
  return <MealList listData={displayedMeals} navigation = {props.navigation}/>;
};
// can be a function when needing dynamic data
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  noMeals: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CategoryMealsScreen;
