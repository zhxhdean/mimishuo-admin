/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { Divider, Row, Col, Button, Switch,message } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('rootStore', 'systemConfigStore')
@observer
export default class index extends Component {

  componentDidMount() {
    this.props.systemConfigStore.getConfig()
  }

  onChange = (name, checked) => {
    this.props.systemConfigStore.setValue(name, checked)
  }

  handleSubmit = () => {
    this.props.rootStore.showLoading()
    this.props.systemConfigStore.setConfig().then(rsp => {
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        message.success('设置成功')
      }else{
        message.error('设置失败')
      }

    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('设置失败')
    })
  }

  render() {
    const { replace, gps } = this.props.systemConfigStore
    return (
      <div>
        <h2>设置配置</h2>
        <Divider />
        <Button type="primary" onClick={this.handleSubmit}>保存设置</Button>
        <Row style={{ marginTop: '15px' }}>
          <Col span={4}>屏蔽词自动过滤：</Col>
          <Col span={20}>
            <Switch
              onChange={this.onChange.bind(this, 'replace')}
              checked={replace}
            />&nbsp;&nbsp;开启此项设置，系统将自动把所有秘密内容和回复内容中涉及到屏蔽词的语句替换成*。
          </Col>
        </Row>

        <Row style={{ marginTop: '15px' }}>
          <Col span={4}>员工加入时GPS验证：</Col>
          <Col span={20}>
            <Switch onChange={this.onChange.bind(this, 'gps')} checked={gps} />
            &nbsp;&nbsp;开启此项设置，所有您公司的员工在扫描公司二维码后，将验证其当前的GPS位置是否位于您设置的公司范围内，若不在，则无法加入。
          </Col>
        </Row>
      </div>
    )
  }
}
