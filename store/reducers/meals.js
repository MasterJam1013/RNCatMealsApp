import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

// initial state obj storing list of all meals, meals associated with favorites, and meals selected as favorite
const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};
// logic for managing filters and favorites state tow args, current state(initial state) and action
const mealsReducer = (state = initialState, action) => {
    //switch on action to handle different cases based on the different action
    switch (action.type) {
        // when fav is toggled add items that are favorited
        case TOGGLE_FAVORITE:
            //index of existing meal greater than -1, current state of favorits meal has same meal id as when action occurs
            const exhistingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            // exhisting meal index greater than or equal to 1
            if (exhistingIndex >= 0){
                //create copy of array to not manipulate original array
                const updatedFavMeals = [...state.favoriteMeals];
                // update the index to remove the item at the current index and edit the above array
                updatedFavMeals.splice(exhistingIndex, 1);
                // return using spread operator new state with an updated favorite  meals
                    return {...state, favoriteMeals:updatedFavMeals };
            }
            // if not
            else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
             // return new state override favorite meals to be old fav meals. retuens to new array which adds new item to array
             return { ...state, favoriteMeals: state.favoriteMeals.concat(meal)};
            }
            // case that handles set filters, updates filtered meals to reflect user set up
            case SET_FILTERS:
                // extract user filters
                const appliedFilters = action.filters;
                // set filtered meals based on total meals avaiable, filter meals
                const updatedFilteredMeals = state.meals.filter(meal => {
                    // if filter set  and meals not return false
                    if (appliedFilters.glutenFree && !meal.isGlutenFree){
                        return false;
                    }
                    if (appliedFilters.lactoseFree && !meal.isLactoseFree){
                        return false;
                    }
                    if (appliedFilters.vegitarian && !meal.isVegetarian){
                        return false;
                    }
                    if (appliedFilters.vegan && !meal.isVegan){
                        return false;
                    }
                    // keep meal if passing if checks
                    return true;
                });
                // return new state with updated filtered meals
                return {...state, filteredMeals: updatedFilteredMeals};
            //default initial state
            default:
                return state;
    }

};

export default mealsReducer;