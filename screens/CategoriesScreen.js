import React from "react";
import {
  StyleSheet,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGrid from "../components/CategoryGrid";

const CategoriesScreen = (props) => {
  //  when pressed trigger navigation to route name screen, pass params takes pobject of any and as many key value pairs as desired (forwarding data of id to new screen being loaded)
  const renderGridItem = (itemData) => {
    return (
      <CategoryGrid
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: itemData.item.id,
            }
          });
        }}
      />
    );
  };
  //    use console log to get special functions associated with react navigation(props.navigation)
  // console.log(props);
  return (
    // Flat list creates grid of desired num columns using data from dummy-data and rendering
    <FlatList data={CATEGORIES} keyExtractor={(item, index) => item.id} renderItem={renderGridItem} numColumns={2} />
  );
};
// react navigation special prop, check docs for available options, Platform reaact native feature for identifying OS and allowing for different styling
CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;
