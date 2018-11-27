import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { Row, Col, Divider, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import ReactEcharts from 'echarts-for-react'

@inject('authenticateStore')
@observer
export default class index extends Component {
  getOption() {
    return {
      title: {
        text: '10月份匿名秘密分类图',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['十分重要', '亟需解决', '一般', '毫无意义', '多人点赞']
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          label: {
            normal: {
              formatter: '{b}:{c}',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 14
              }
            }
          },
          data: [
            {
              value: 1548,
              name: '十分重要'
            },
            { value: 535, name: '亟需解决' },
            { value: 510, name: '一般' },
            { value: 634, name: '毫无意义' },
            { value: 735, name: '多人点赞' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  render() {
    const { userInfo } = this.props.authenticateStore
    return (
      <div className="index-page">
        <Row>
          <Col span={16}>
            <div className="main">
              <Row>
                <Col span={24}>
                  <span className="orange">您好，{userInfo.userName}</span>{' '}
                  您已使用31天，还可以继续使用12天。<Link to="#">去充值</Link>
                </Col>
              </Row>
              <Row style={{ paddingTop: '15px' }}>
                <Col span={8}>
                  今日秘密：<span className="red">12</span>
                </Col>
                <Col span={8}>
                  未读秘密：<span className="red">4</span>
                </Col>
                <Col span={8}>
                  回复秘密：<span className="red">8</span>
                </Col>
              </Row>
              <Row style={{ paddingTop: '20px' }}>
                <Col span={24}>
                  <ReactEcharts
                    option={this.getOption()}
                    style={{ height: '400px' }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <div className="short-tools">
              <h2>快捷工具</h2>
              <Divider />
              <Row>
                <Col span={8} className="center">
                  <Link to="/changepassword">
                    <Icon type="lock" />
                    <br /> 修改密码
                  </Link>
                </Col>
                <Col span={8} className="center">
                  <Link to="/secret">
                    <Icon type="file-text" />
                    <br /> 查看秘密
                  </Link>
                </Col>
                <Col span={8} className="center">
                  <Link to="/userinfo">
                    <Icon type="user" />
                    <br /> 用户信息
                  </Link>
                </Col>
              </Row>
              <Row className="mt20">
                <Col span={8} className="center">
                  <Link to="/shieldedword">
                    <Icon type="hdd" />
                    <br /> 屏蔽词管理
                  </Link>
                </Col>

                <Col span={8} className="center">
                  <Link to="/newsletter">
                    <Icon type="read" />
                    <br /> 发布历史
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
