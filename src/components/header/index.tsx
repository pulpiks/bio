import { PureComponent, createElement } from 'react'
import { Row, Col } from 'antd'

export class Header extends PureComponent {
  render() {
    return (
        <Row>
            <Col span={24}>
                Kseniia Lvova: programmer, adventurer, enthusiast
            </Col>
        </Row>
    )
  }
}
