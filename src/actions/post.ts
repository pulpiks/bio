import { Category } from "../types/models";
import { Dispatch } from "../store";
import { client } from "../constants";
import { EntryCollection } from "contentful";

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

export const getPost = (slug: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await client.getEntries({
                content_type: 'post',
                'fields.slug': slug,
            })

            const post = res.items[0]
            const {sys, fields, ...rest} = post
            return dispatch({
                type: CREATE_POST_SUCCESS,
                data: {
                    ...sys,
                    ...fields
                },
                slug
            })
        }
        catch(e) {
            return dispatch({
                type: CREATE_POST_FAILURE,
                data: null,
                slug
            })
        }
    }
}