import React, { Component } from 'react'
import {
  Divider,
  DatePicker,
  Switch,
  Icon,
  Select,
  Input,
  message,
  Button,
} from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import './index.less'

import { get, post } from '../../service/request'

import { TOPIC_REPLY, TOPIC_REPLY_STATUS } from '../../service/urls'
const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select
@inject('rootStore', 'topicStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endTime: '',
      secret: false,
      subject: '',
      condition: {
        key: '',
        status: '',
        startTime: '',
        endTime: '',
      },
    }
  }
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.topicStore
      .getList({ pageIndex: 1, pageSize: 100 })
      .then((rsp) => {
        this.props.rootStore.hideLoading()
      })
      .catch((err) => {
        this.props.rootStore.hideLoading()
      })
  }

  disabledDate(current) {
    return (
      current &&
      current <
        moment()
          .add(-1, 'day')
          .endOf('day')
    )
  }
  onChangeDate(date, dateString) {
    this.setState({ endTime: dateString })
  }
  onChangeSwitch(checked) {
    this.setState({ secret: checked })
  }
  onChangeInput(e) {
    this.setState({ subject: e.target.value })
  }
  onChangeStatus(value) {
    this.setState({ condition: { ...this.state.condition, status: value } })
  }
  onChangeKeyWord(e) {
    this.setState({
      condition: { ...this.state.condition, key: e.target.value },
    })
  }
  onChangeRangeDate(date, dateString) {
    console.log(dateString)
    this.setState({
      condition: {
        ...this.state.condition,
        startTime: dateString[0],
        endTime: dateString[1],
      },
    })
  }
  // 提交数据
  onSubmit() {
    this.props.rootStore.showLoading()
    this.props.topicStore
      .add({
        subject: this.state.subject,
        secretTopic: this.state.secret,
        expireDate: this.state.endTime.replace(' ', 'T'),
      })
      .then((rsp) => {
        this.props.rootStore.hideLoading()
        if (rsp.code === 0) {
          message.success('发布成功')
        } else {
          message.error(rsp.content)
        }
      })
      .catch((err) => {
        this.props.rootStore.hideLoading()
        message.error('发布遇到错误')
      })
  }
  onSearch() {
    const { key, status, startTime, endTime } = this.state.condition
    this.props.topicStore.getList({
      pageIndex: 1,
      pageSize: 100,
      keyword: key,
      status,
      createBeginTime: startTime,
      createEndTime: endTime,
    })
  }
  async getReply(item) {
    const replyList = await get({ url: `${TOPIC_REPLY}${item.topicId}` })
    item.reply = replyList.data || []
    console.log(item)
  }
  async setReplyStatus(item) {
    const rst = await post({
      url: `${TOPIC_REPLY_STATUS}`,
      data: { topicReplyId: item.topicReplyId, show: !item.show },
    })
    item.show = !item.show
  }
  render() {
    let items = this.props.topicStore.topic
    return (
      <div className="topic">
        <h2>话题发布</h2>

        <div className="create-topic">
          <ul>
            <li>
              截止日期{' '}
              <DatePicker
                onChange={this.onChangeDate.bind(this)}
                disabledDate={this.disabledDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            </li>
            <li>
              秘密话题 <Switch onChange={this.onChangeSwitch.bind(this)} />
            </li>
          </ul>
          <div className="txt-topic">
            <TextArea
              rows={2}
              onChange={this.onChangeInput.bind(this)}
              allowClear={true}
              placeholder="请输入话题，最多100字"
            />
            <Button
              type="primary"
              icon="form"
              onClick={this.onSubmit.bind(this)}
            >
              提交
            </Button>
          </div>
        </div>
        <Divider className="divider" />
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="搜索话题关键字"
            style={{ width: 200 }}
            onChange={this.onChangeKeyWord.bind(this)}
          />
          &nbsp;&nbsp;状态：
          <Select
            allowClear={true}
            style={{ width: 120 }}
            placeholder="请选择"
            onChange={this.onChangeStatus.bind(this)}
          >
            <Option value="1">已发布</Option>
            <Option value="5">已下架</Option>
            <Option value="9">已结束</Option>
          </Select>
          &nbsp;&nbsp;发布时间：
          <RangePicker onChange={this.onChangeRangeDate.bind(this)} />
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.onSearch.bind(this)}>
            搜索
          </Button>
        </div>

        <div>
          {items.map((item) => (
            <div key={item.topicId} className="topic-list">
              <div className="topic-list-item">
                <div>{item.subject}</div>
                <div>
                  {moment(item.publishTime).format('YYYY年MM月DD日 HH:mm:ss')}-
                  {moment(item.expireDate).format('YYYY年MM月DD日 HH:mm:ss')}
                </div>
                <div
                  style={{ width: '50px' }}
                  onClick={() => {
                    item.show = !item.show
                    this.getReply(item)
                  }}
                >
                  {item.show ? '收起' : '展开'}
                </div>
                <div>
                  <Icon type="poweroff" />
                </div>
              </div>
              <div
                style={{
                  display: item.show ? 'flex' : 'none',
                  flexDirection: 'column',
                }}
              >
                {item.reply.map((r) => (
                  <div key={r.topicReplyId} className="reply-list">
                    <div>
                      {moment(r.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                    <div>{r.content}</div>
                    <div onClick={() => this.setReplyStatus(r)}>
                      {!r.show ? (
                        <Icon type="eye" />
                      ) : (
                        <Icon type="eye" theme="filled" />
                      )}
                    </div>
                  </div>
                ))}
                {item.reply.length === 0 && '没有回复'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
