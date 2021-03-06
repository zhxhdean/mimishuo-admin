/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { Divider, Spin, message,Row,Col,Checkbox,Icon,Input,Button } from 'antd'
import { inject, observer } from 'mobx-react'
import {getSecretStatus} from '../../common/constant'
import PreviewImage from '../../components/PreviewImage'
import './index.less'
import CountDown from '../../components/CountDown'
import NewsLetterPendingList from '../../components/NewsLetterPendingList'
import moment from 'moment'
const CheckboxGroup = Checkbox.Group
const TextArea = Input.TextArea
@inject('secretDetailStore', 'rootStore', 'pendingListStore','tagsStore')
@observer
export default class index extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.tagsStore.formatTags()
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
        const t = this.props.secretDetailStore.secretDetail.tags || []
        this.props.secretDetailStore.setTags(t.map(item => item.tagId))
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
    this.props.secretDetailStore.setValue('reply', value)
  }

  // 标签选择
  handleTagsChange = val => {
    console.log(val)
    this.props.secretDetailStore.setTags(val)
  }
  
  
  handleSubmit = () => {
    let {secretDetail,tags} = this.props.secretDetailStore
    if(!secretDetail.reply){
      message.error('回复内容不能为空！')
      return
    }

    this.props.secretDetailStore.save(secretDetail.reply, secretDetail.secretId, tags).then(rsp => {
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
    const { secretDetail,tags } = this.props.secretDetailStore
    const {tagsForSecret} = this.props.tagsStore
    return (
      <div className="secret-detail-page">
       {/*eslint-disable no-script-url*/}
        <h2>秘密详情 <a href="javascript:void(0);" onClick={() => this.props.history.goBack()}><Icon type="caret-left" />返回</a></h2>
        <Divider />
        <Spin spinning={loading}>
          <ul>
            <li>
    <h3>{secretDetail.burnAfterReading ? <span className="red"><CountDown endTime ={secretDetail.burnTime}/>【阅后即焚】</span>: ''}<span className="orange">【{getSecretStatus(secretDetail.status)}】</span>{secretDetail.subject}</h3>
              <Button type="primary" onClick={this.handleJoinNewsLetter.bind(this, secretDetail)}>加入本期周刊</Button>
            </li>
            <li>
              <Row>
                {/* <Col span={10}><label className="label">发布人：</label>{secretDetail.author}</Col> */}
                <Col span={24}><label className="label">发布时间：</label>{new moment(secretDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
              </Row>
              <Row>
                <Col span={24}><label className="label">标签：</label><CheckboxGroup value={tags} options={tagsForSecret} onChange={this.handleTagsChange}></CheckboxGroup></Col>
              </Row>
              <Row>
                <Col span={10}><label className="label">阅读数量：</label>{secretDetail.viewNum}</Col>
                <Col span={12}><label className="label">点赞人数：</label>{secretDetail.likeNum}</Col>
              </Row>
              <Row>
                <Col span={2}><label className="label">内容：</label></Col>
                <Col span={18}>{secretDetail.content}</Col>
              </Row>
              <Row>
                <Col span={2}><label className="label">图片：</label></Col>
                <Col span={18}>{secretDetail.imageUrls && secretDetail.imageUrls.map((item,index) => {
                  return <img src={item} key={index} className="small-image" title="点击查看大图" alt="图片描述" onClick={this.props.rootStore.showCarouse.bind(this, index)}/>
                })}</Col>
              </Row>
              <Row>
                <Col span={2}><label className="label">回复：</label></Col>
                <Col span={18}>
                <textarea style={{width: "100%"}} onChange={this.handleInputChange} value={secretDetail.reply || ''}></textarea></Col>
              </Row>
              <Row>
                <Col span={2}></Col>
                <Col span={18}><Button type="primary" onClick={this.handleSubmit}>保存</Button></Col>
              </Row>
            </li>
          </ul>

          <PreviewImage img={secretDetail.imageUrls}/>
          {/* <NewsLetterPendingList/> */}
        </Spin>
      </div>
    )
  }
}
