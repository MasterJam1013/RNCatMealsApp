
// unique identifier to toggle favorites
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
// unique identifier to set filters
export const SET_FILTERS = 'SET_FILTERS';


//functs that creates action, points at identifier and any other data
// toggle filters with set parameter id
export const toggleFavorite = (id) => {
 return { type: TOGGLE_FAVORITE, mealId: id};
};
//filterSettings, an obj with filter data that returns action obj
export const setFilter = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings};
   };