import { Dispatch } from "../store";
import { client } from "../constants";
import { EntryCollection } from "contentful";
import { ContentfulPostFields, ContentfulPost, ContentfulPostItems } from "../types/contentful";

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

export const getPost = (slug: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await client.getEntries({
                content_type: 'post',
                'fields.slug': slug,
            })

            const post = res 
            const {sys, fields, ...rest} = post.items[0]
            const contentfulCategories = (fields as ContentfulPostFields).categories
            const categories = contentfulCategories.map((c) => ({
                ...c.sys,
            }))
            return dispatch({
                type: CREATE_POST_SUCCESS,
                data: {
                    ...sys,
                    ...fields,
                    categories
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