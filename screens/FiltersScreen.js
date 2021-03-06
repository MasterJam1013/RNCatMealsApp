import React, { useState, useEffect, useCallback }  from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../components/CustomHeaderButton";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/actions/meals";

// Switch
const FilterSwitch = props => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
          trackColor={{ true: colors.primaryColor }}
          thumbColor={Platform.OS === 'android' ? colors.primaryColor : ''}
          value={props.state}
          onValueChange={props.onChange}
        />
      </View>
    );
  };
  
  const FiltersScreen = props => {
    const { navigation } = props;

  // setting state for filters
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    //accessing dispatch funct in redux
    const dispatch = useDispatch();
  
    // funct to save filter settings
    const saveFilters = useCallback(() => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        vegetarian: isVegetarian
      };
  // call dispatch action to forward filtered obj
      dispatch(setFilter(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
  // useEffect to save filters using navigation
    useEffect(() => {
      navigation.setParams({ save: saveFilters });
    }, [saveFilters]);
  
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Available Filters / Restrictions</Text>
        <FilterSwitch
          label="Gluten-free"
          state={isGlutenFree}
          onChange={newValue => setIsGlutenFree(newValue)}
        />
        <FilterSwitch
          label="Lactose-free"
          state={isLactoseFree}
          onChange={newValue => setIsLactoseFree(newValue)}
        />
        <FilterSwitch
          label="Vegan"
          state={isVegan}
          onChange={newValue => setIsVegan(newValue)}
        />
        <FilterSwitch
          label="Vegetarian"
          state={isVegetarian}
          onChange={newValue => setIsVegetarian(newValue)}
        />
      </View>
    );
  };
  
  FiltersScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Filter Meals',
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
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={navData.navigation.getParam('save')}
          />
        </HeaderButtons>
      )
    };
  };
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center'
    },
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      margin: 20,
      textAlign: 'center'
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      marginVertical: 15
    }
  });
  
  export default FiltersScreen;
  