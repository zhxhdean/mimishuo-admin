import React, { Component } from 'react'
import {Row,Col,Button,Input} from 'antd'

let interval
export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      disable: false,
      countDown: 60
    }
  }

  handleSend =() => {
    let countDown = this.state.countDown
    //todo 调接口发送验证码
    this.setState({disable: true})
    interval = setInterval(() => {
      if(this.state.countDown === 0){
        clearInterval(interval)
        this.setState({disable: false, countDown: 60})
      }else{
        this.setState({countDown: --countDown})
      }
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(interval)
  }
  render() {
    return (
      <div>
          <Row>
            <Col>验证码：</Col>
          </Row>
          <Row className="pdtb10">
            <Col>
              <Input
                placeholder="请输入验证码"
                onChange={this.props.handleInputChange.bind(this, 'verify')}
                style={{width: '150px'}}
              />
              <Button style={{marginTop: '0'}} disabled={this.state.disable} onClick={this.handleSend}>发送验证码{this.state.disable && `(${this.state.countDown})`}</Button>
            </Col>
          </Row>
      </div>
    )
  }
}
