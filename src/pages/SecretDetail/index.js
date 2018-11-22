import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Divider, Spin, message,Row,Col,Checkbox,Icon,Input,Button } from 'antd'
import { inject, observer } from 'mobx-react'
import {SECRET_TAGS} from '../../common/constant'
import PreviewImage from '../../components/PreviewImage'
import './index.less'
import CountDown from '../../components/CountDown'
import NewsLetterPendingList from '../../components/NewsLetterPendingList'

const CheckboxGroup = Checkbox.Group
const TextArea = Input.TextArea
@inject('secretDetailStore', 'rootStore', 'pendingListStore')
@observer
export default class index extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    this.loadData(+id)
  }

  componentWillReceiveProps(nextProps){
    if(+nextProps.match.params.id !== +this.props.match.params.id){
      this.loadData(+nextProps.match.params.id)
    }
  }

  loadData(id){
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

  // 回复内容
  handleInputChange = e => {
    const value = e.target.value
    this.props.secretDetailStore.setValue('replyContent', value)
  }

  // 标签选择
  handleTagsChange = val => {
    this.props.secretDetailStore.setValue('tags', val)
  }
  
  
  handleSubmit = () => {
    if(!this.props.secretDetailStore.secretDetail.replyContent){
      message.error('回复内容不能为空！')
      return
    }
    this.props.secretDetailStore.editDetail().then(rsp => {
      if(rsp.code === 0){
        message.success('回复成功！')
      }else{
        message.error(rsp.content)
      }
    })
  }

  handleJoinNewsLetter = (obj, e) => {
    // this.props.rootStore.showNewsLetter()
    this.props.pendingListStore.join(obj)
  }
  render() {
    const { loading } = this.props.rootStore
    const { secretDetail } = this.props.secretDetailStore
    return (
      <div className="secret-detail-page">
        <h2>秘密详情 <Link to="/secret"><Icon type="caret-left" />返回</Link></h2>
        <Divider />
        <Spin spinning={loading}>
          <ul>
            <li>
              <h3>{secretDetail.remove ? <span className="red"><CountDown endTime ={secretDetail.removeTime}/>【阅后即焚】</span>: ''}{secretDetail.title}</h3>
              <Button type="primary" onClick={this.handleJoinNewsLetter.bind(this, secretDetail)}>加入发布清单</Button>
            </li>
            <li>
              <Row>
                <Col span={10}><label className="label">发布人：</label>{secretDetail.author}</Col>
                <Col span={12}><label className="label">发布时间：</label>{secretDetail.createTime}</Col>
              </Row>
              <Row>
                <Col span={24}><label className="label">标签：</label><CheckboxGroup value={secretDetail.tags} options={SECRET_TAGS} onChange={this.handleTagsChange}></CheckboxGroup></Col>
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
              <Row>
                <Col span={2}><label className="label">回复：</label></Col>
                <Col span={18}><TextArea placeholder="请输入回复内容" row={5} value={secretDetail.replyContent} onChange={this.handleInputChange}></TextArea></Col>
              </Row>
              <Row>
                <Col span={2}></Col>
                <Col span={18}><Button type="primary" onClick={this.handleSubmit}>保存</Button></Col>
              </Row>
            </li>
          </ul>

          <PreviewImage img={secretDetail.img}/>
          <NewsLetterPendingList/>
        </Spin>
      </div>
    )
  }
}
