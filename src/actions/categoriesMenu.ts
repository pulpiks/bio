import { Category } from "../types/models";
import { Dispatch } from "../store";
import { client } from "../constants";

export const CREATE_CATEGORIES_SUCCESS = 'CREATE_CATEGORIES_SUCCESS'
export const CREATE_CATEGORIES_FAILURE = 'CREATE_CATEGORIES_FAILURE'

export const getCategories = () => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await client.getEntries({
                content_type: 'category',
                order: 'sys.createdAt',
            })
            const categories = res.items.map((item) => ({
                ...item.fields,
                ...item.sys
            }))
            return dispatch({
                type: CREATE_CATEGORIES_SUCCESS,
                data: categories
            })
        }
        catch(e) {
            return dispatch({
                type: CREATE_CATEGORIES_FAILURE,
                data: []
            })
        }
    }
}