import { 
  applyMiddleware, 
  combineReducers, 
  compose, 
  createStore, 
  GenericStoreEnhancer, 
  // Dispatch as DispatchInterface 
} from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { bio, BioState } from '../reducers/bio'
import { categoriesMenu, CategoriesState } from '../reducers/categoriesMenu';
import { posts, PostStore } from '../reducers/posts';
import { category, CategoryStore } from '../reducers/category';

// export type Dispatch = DispatchInterface<State>
export type Dispatch = DispatchInterface<State>


export type DispatchInterface<S> = <NestedA>(action: NestedA|ThunkFunction<S>) => NestedA

export type GetState<S> = () => S

export type ThunkFunction<S, R = any> = (dispatch: DispatchInterface<S>, getState: GetState<S>) => R // tslint:disable-line:no-any


export interface State {
  readonly bio: BioState
  readonly categories: CategoriesState
  readonly posts: PostStore,
  readonly category: CategoryStore
}

interface CustomWindow extends Window {
  readonly __REDUX_DEVTOOLS_EXTENSION__?: () => GenericStoreEnhancer
}

export const history = createBrowserHistory()

const rootReducer = combineReducers<State>({
  bio,
  categories: categoriesMenu,
  category, 
  posts,
})

const middleware: GenericStoreEnhancer[] = [
  applyMiddleware(thunk),
]

if (window) {
  const customWindow: CustomWindow = window

  if (customWindow.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware.push(customWindow.__REDUX_DEVTOOLS_EXTENSION__())
  }
}

export const store = createStore<State>(
    rootReducer,
    // retrieveMiddleware(),
    compose.apply(null, middleware),
)
