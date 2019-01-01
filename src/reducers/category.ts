import { Reducer } from 'redux'
import { Post } from '../types/models';
import { CREATE_CATEGORY, CREATE_CATEGORY_FAILURE } from '../actions/category';

export interface CategoryStore {
    readonly [slug: string]: Post[]
}

export type CreateCategoryTypeSuccess = {
    type: typeof CREATE_CATEGORY
    data: Post[],
    slug: string,
} 

export type CreateCategoryTypeFailure = {
    type: typeof CREATE_CATEGORY_FAILURE
    data: Post[],
    slug: string,
} 

export const defaultState = {}

export type CategoryState = CategoryStore

type Action = CreateCategoryTypeSuccess | CreateCategoryTypeFailure

export const category: Reducer<CategoryState> = (state = defaultState, action: Action) => {
    switch (action.type) {
        case CREATE_CATEGORY: 
            return {
                ...state,
                [action.slug]: action.data
            }
        case CREATE_CATEGORY_FAILURE: 
            return {
                ...state,
            }
        default: return state
    }
}
