import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Divider, Row, Col } from 'antd'
@inject('userInformationStore')
@observer
export default class index extends Component {
  componentDidMount() {
    this.props.userInformationStore.getUserInformation(10)
  }
  render() {
    const { userInformation } = this.props.userInformationStore
    return (
      <div>
        <h2>用户信息</h2>
        <Divider />
        <Row>
          <Col span={3}>登录账号：</Col>
          <Col span={8} className="black">
            {userInformation.userName}
          </Col>
        </Row>
        <Row>
          <Col span={3}>手机号码：</Col>
          <Col span={8} className="black">
            {userInformation.phone}
          </Col>
        </Row>
        <Row>
          <Col span={3}>企业名称：</Col>
          <Col span={8} className="black">
            {userInformation.company}
          </Col>
        </Row>
        <Row>
          <Col span={3}>社会信用代码：</Col>
          <Col span={8} className="black">
            {userInformation.creditCode}
          </Col>
        </Row>
      </div>
    )
  }
}
