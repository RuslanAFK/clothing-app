import { AnyAction } from "redux";
import { fetchCategoriesFail, fetchCategoriesStart, fetchCategoriesSuccess } from "./categories.actions";
import { Category } from "./categories.types";

export type CategoriesState = {
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null,
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction) => {

    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true }
    }
    if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            categories: action.payload,
            isLoading: false,
        }
    }
    if (fetchCategoriesFail.match(action)) {
        return { ...state, isLoading: false, error: action.payload }
    }
    return state;
}