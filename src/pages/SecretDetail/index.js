import React, { Component } from 'react'

import { Divider, Spin, message,Row,Col,Checkbox } from 'antd'
import { inject, observer } from 'mobx-react'
import {SECRET_TAGS} from '../../common/constant'
import PreviewImage from '../../components/PreviewImage'
import './index.less'

const CheckboxGroup = Checkbox.Group
@inject('secretDetailStore', 'rootStore')
@observer
export default class index extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.rootStore.showLoading()
    this.props.secretDetailStore
      .getDetail(+id)
      .then(rsp => {
        if (rsp.code !== 0) {
          message.error('数据加载失败')
        }
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }
  render() {
    const { loading } = this.props.rootStore
    const { secretDetail } = this.props.secretDetailStore
    return (
      <div className="secret-detail-page">
        <h2>秘密列表 > 秘密详情</h2>
        <Divider />
        <Spin spinning={loading}>
          <ul>
            <li>
              <h3>{secretDetail.remove ? <span className="red">【阅后即焚】</span>: ''}{secretDetail.title}</h3>
            </li>
            <li>
              <Row>
                <Col span={10}><label className="label">发布人：</label>{secretDetail.author}</Col>
                <Col span={12}><label className="label">发布时间：</label>{secretDetail.createTime}</Col>
              </Row>
              <Row>
                <Col span={24}><label className="label">标签：</label><CheckboxGroup options={SECRET_TAGS}></CheckboxGroup></Col>
              </Row>
              <Row>
                <Col span={10}><label className="label">阅读数量：</label>{secretDetail.viewCount}</Col>
                <Col span={12}><label className="label">点赞人数：</label>{secretDetail.voteCount}</Col>
              </Row>
              <Row>
                <Col span={2}><label className="label">内容：</label></Col>
                <Col span={18}>{secretDetail.content}</Col>
              </Row>
              <Row>
                <Col span={2}><label className="label">图片：</label></Col>
                <Col span={18}>{secretDetail.img.map((item,index) => {
                  return <img src={item} key={index} className="small-image" title="点击查看大图" alt="图片描述" onClick={this.props.rootStore.showCarouse.bind(this, index)}/>
                })}</Col>
              </Row>
            </li>
          </ul>

          <PreviewImage img={secretDetail.img}/>
        </Spin>
      </div>
    )
  }
}
