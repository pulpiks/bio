import { Reducer } from 'redux'
import { Post } from '../types/models';
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../actions/post';

export interface PostStore {
    readonly [slug: string]: Post
}

export type CreateCategoryTypeSuccess = {
    type: typeof CREATE_POST_SUCCESS
    data: Post,
    slug: string
} 

export type CreateCategoryTypeFailure = {
    type: typeof CREATE_POST_FAILURE
    data: null,
    slug: string
} 

const defaultState = {}

type Action = CreateCategoryTypeSuccess | CreateCategoryTypeFailure

export const posts: Reducer<PostStore> = (state = defaultState, action: Action) => {
    switch (action.type) {
        case CREATE_POST_SUCCESS: 
            return {
                ...state,
                [action.slug]: action.data
            }
        case CREATE_POST_FAILURE: 
            return {
                ...state,
            }
        default: return state
    }
}
