const backendUrl = process.env.REACT_APP_FOODLIST_BACKEND_URL;
export const API_URL = backendUrl ? backendUrl : "http://192.168.49.2/api/";
export const RECIPES_QUERY = "recipes/";
export const MEAL_QUERY = "meal/";
export const MEAL_PLAN_QUERY = "mealPlans/";
export const MEAL_PLAN_URL = `${API_URL}${MEAL_PLAN_QUERY}`;
export const SHOPPING_LIST_QUERY = "shoppingLists/";
export const ITEMS_QUERY = "items/";
export const SHOPPING_LIST_ITEMS_URL = `${API_URL}${SHOPPING_LIST_QUERY}${ITEMS_QUERY}`;
export const SHOPPING_LIST_MEAL_PLAN_QUERY = "shoppingLists/mealPlan/";
export const DEBOUNCED_DELAY = 800;
