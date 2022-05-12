import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  // useSelect to get favored meals
  const favoredmeals = useSelector(state => state.meals.favoriteMeals);
  //  forwarding data props to new screen being loaded)
  const renderMealItem = (itemData) => {
    // is meal a favorite meal
    const isFavored = favoredmeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        // navigate to details page on select using params to call specific meal by meal id, title 
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavored
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      {/* keyExtractor Used to extract a unique key for a given item at the specified index. Key is used for caching and as the react key to track item re-ordering. */}
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default MealList;
