import { Category } from "../types/models";
import { Dispatch } from "../store";
import { client } from "../constants";

export const CREATE_CATEGORIES_SUCCESS = 'CREATE_CATEGORIES_SUCCESS'
export const CREATE_CATEGORIES_FAILURE = 'CREATE_CATEGORIES_FAILURE'

export const getCategories = () => {
    async (dispatch: Dispatch) => {
        try {
            const res = await client.getEntries({
                content_type: 'category'
            })
            const categories = res.items
            dispatch({
                type: CREATE_CATEGORIES_SUCCESS,
                data: categories
            })
        }
        catch(e) {
            dispatch({
                type: CREATE_CATEGORIES_FAILURE,
                data: []
            })
        }
    }
}