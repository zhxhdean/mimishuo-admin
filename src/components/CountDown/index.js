import React, { Component } from 'react'
import { Icon } from 'antd'

let interval
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endTime: this.props.endTime,
      countDown: ''
    }
  }
  componentDidMount() {
    // 截止时间戳
    const endTime = new Date(this.state.endTime)
    interval = setInterval(() => {
       // 当前时间戳
       const now = Date.now()
      let subTime = endTime - now
      if (subTime > 0) {
        const format = `${(new Date(subTime).getMinutes()+'').padStart(2, '0')}:${(new Date(subTime).getSeconds()+'').padStart(2, '0')}`
        this.setState({countDown: format})
      } else {
        clearInterval(interval)
        this.setState({ countDown: '已过期' })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  render() {
    return (
      <span className="red">
        <Icon type="clock-circle" /> {this.state.countDown}
      </span>
    )
  }
}
