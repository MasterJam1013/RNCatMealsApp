import React, {useCallback, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from "../store/actions/meals";


const ListItem = props => {
    return (
      <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
      </View>
    );
  };


const MealDetailScreen = props => {
  // useSelector selects a slice of state to use in a component, part of redux package. takes a function that gets state as arg and return data from that state
  const availableMeals = useSelector(state => state.meals.meals);
    // defining MealId and using navigation to get meal ID parameter of dummy data
    const mealId = props.navigation.getParam('mealId');
    //get favorite meals using useSelector. some built in method that returns true if condition is met by at least one item
  const mealFavored = useSelector(state=> state.meals.favoriteMeals.some(meal => meal.id === mealId));
    // using vanilla JS find method to locate meal.id from data and set to mealID var
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
   // useDispatch, uses a dispatch functionstore new actions in a constant
   const dispatch = useDispatch();
   // handle dispatch actions
   const toggleFavoriteHandler = useCallback(() => {
       dispatch(toggleFavorite(mealId));
   },
   // specify dependencies
   [dispatch, mealId]
);
   // to prevent creating an infinite loop useEffect,
   useEffect( () => {
     //setting param to a new value to forward select meal to override existing param
   //   props.navigation.setParams({mealTitle: selectedMeal.title});
     props.navigation.setParams({toggleFav: toggleFavoriteHandler});
   },
   // dependency
   [toggleFavoriteHandler]);
   //passing favoredmeals with useEffect
   useEffect(() => {
     props.navigation.setParams({isFavored: mealFavored});
   },
   //dependency
    [mealFavored]);
    return(
        <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
    );

};
// using navigationData to find dynamic data by mealId 
MealDetailScreen.navigationOptions = navigationData => {
    // const mealId = navigationData.navigation.getParam('mealId');
    // using navigationData to find dynamic data by mealTitle
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    // using navigationData to find toggled fav
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    //navigation data for favored meal
    const favored = navigationData.navigation.getParam('isFavored');
    
 
  
    return {
        headerTitle: mealTitle,
        headerRight: () =>
        // expects header button component prop that poins at the component that should be used to render item
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            {/* usiong favored const to display empty or filled icon based on if favored*/}
            <Item title='Favorite' iconName={favored ? 'ios-star' : 'ios-star-outline'} onPress={ toggleFavorite }/>
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
      },
      details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
      },
      title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
      },
      listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
      }
});

export default MealDetailScreen;


