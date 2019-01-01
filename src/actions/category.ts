import { Category } from "../types/models";
import { Dispatch, State } from "../store";
import { client } from "../constants";

export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE'

export const getCategory = (slug: string) => {
    return async (dispatch: Dispatch, getState: () => State) => {
        try {
            const {categories} = getState()
            const cat = categories.find(c => c.slug === slug)
            const category = await client.getEntries({
                content_type: 'post',
                'fields.categories.sys.id': cat.id,
                order: 'sys.createdAt',
            })
            const posts = category.items.map((item) => item.fields)
            return dispatch({
                type: CREATE_CATEGORY,
                data: posts,
                slug
            })
        }
        catch(e) {
            return dispatch({
                type: CREATE_CATEGORY_FAILURE,
                data: [],
                slug
            })
        }
    }
}