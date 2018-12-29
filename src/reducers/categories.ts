import { Reducer } from 'redux'
import { Category } from '../types/models';
import { CREATE_CATEGORIES_FAILURE, CREATE_CATEGORIES_SUCCESS } from '../actions/categories';

export type CategoriesState =  Category[]

const defaultState: CategoriesState = []


export type CreateCategoryTypeSuccess = {
    type: typeof CREATE_CATEGORIES_SUCCESS
    data: Category[]
} 

export type CreateCategoryTypeFailure = {
    type: typeof CREATE_CATEGORIES_FAILURE
    data: []
} 

type Action = CreateCategoryTypeSuccess | CreateCategoryTypeFailure

export const bio: Reducer<CategoriesState> = (state = defaultState, action: Action) => {
    switch (action.type) {
        case CREATE_CATEGORIES_SUCCESS: 
            return [
                ...state,
                data: action.data
            ]
        case CREATE_CATEGORIES_FAILURE: 
            return {
                ...state,
                data: []
            }  
        default: return state
    }
}
