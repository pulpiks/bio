import { createSelector } from 'reselect'
import { State } from '../store';
// import { CategoryState } from '../reducers/category';
// import { CategoriesState } from '../reducers/categoriesMenu';


const getCategoriesSelector = (state: State) => state.categories

export const getCategoriesSlug = createSelector(
    getCategoriesSelector,
    (categories) => categories.reduce((res, category) => {
        return {
            ...res,
            [category.id]: category
        }
    }, {})
)