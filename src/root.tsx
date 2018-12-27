import { createElement, StatelessComponent } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { State } from './store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App'
import {Feedback} from './components/FeedbackForm'

export interface Props {
  readonly history?: History
  readonly store: Store<State>
}

export const Root: StatelessComponent<Props> = ({ store }) => (
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <App>
                    <Route
                        {...{
                            name: 'main',
                            path: '/',
                            exact: true,
                        }}
                    />
                    <Route
                        {...{
                            name: 'feedback',
                            path: '/feedback',
                            component: Feedback,
                            exact: true,
                        }}
                    />
                </App>
            </Switch>
        </BrowserRouter>
    </Provider>
)

Root.displayName = 'Root'
