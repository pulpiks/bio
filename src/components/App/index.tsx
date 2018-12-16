import * as React from 'react'
import { PureComponent } from "react"
import { Button } from 'antd'
import "./styles.css"

export default class App extends PureComponent {
    render() {
        return (
            <div className="App">
                <Button type="primary">Hello</Button>
            </div>
        )
    }
}
