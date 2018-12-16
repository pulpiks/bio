import * as React from 'react'
import {createElement, StatelessComponent} from 'react'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import {State} from './store'
import App from './components/App'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

export interface Props {
  readonly history?: History,
  readonly store: Store<State>,
}

export const Root: StatelessComponent<Props> = ({store}) => (
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route
                    {...{
                        name: 'main',                  
                        path: '/',                        
                        component: App, 
                        exact: true
                    }}
                />
            </Switch>
        </BrowserRouter>
    </Provider>
)

Root.displayName = 'Root'
