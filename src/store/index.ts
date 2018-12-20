import { applyMiddleware, combineReducers, compose, createStore, GenericStoreEnhancer } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { bio, BioState } from '../reducers/bio'

export interface State {
  readonly bio: BioState
}

interface CustomWindow extends Window {
  readonly __REDUX_DEVTOOLS_EXTENSION__?: () => GenericStoreEnhancer
}

export const history = createBrowserHistory()

const rootReducer = combineReducers<State>({
  bio,
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
