import React, { Component } from 'react'
import {
  Divider,
  DatePicker,
  Switch,
  Icon,
  Tooltip,
  Input,
  message,
  Button
} from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment';
import './index.less'
const { TextArea } = Input;
const { Search } = Input;
@inject('rootStore', 'tagsStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endTime: '',
      secret: false,
      subject: ''
    }
  }
  componentDidMount() {
    this.props.rootStore.showLoading()
  }

  disabledDate (current) {
    return current && current < moment().add(-1, 'day').endOf('day');
  }
  onChangeDate(date, dateString) {
    this.setState({endTime: dateString});
  }
  onChangeSwitch(checked) {
    this.setState({secret: checked});
  }
  onChangeInput(e) {
    this.setState({subject: e.target.value});
  }
  // 提交数据
  onSubmit () {
    console.log(this.state)
  }
  onSearch(value) {

  }
  render() {
    return (
      <div className="topic">
        <h2>话题发布</h2>
        
        <div className="create-topic">
          <ul>
            <li>
              截止日期{' '}<DatePicker onChange={this.onChangeDate.bind(this)} disabledDate={this.disabledDate} showTime format="YYYY-MM-DD HH:mm:ss" />
            </li>
            <li>
              秘密话题{' '}
              <Switch onChange={this.onChangeSwitch.bind(this)} />
            </li>
          </ul>
          <div className="txt-topic">
            <TextArea rows={2} onChange={this.onChangeInput.bind(this)} allowClear placeholder="请输入话题，最多100字"/>
            <Button type="primary" icon="form" onClick={this.onSubmit.bind(this)}>提交</Button>
          </div>
        </div>
        <Divider className="divider"/>
        <div>
        <Search
          placeholder="搜索话题关键字"
          onSearch={this.onSearch}
          style={{ width: 200 }}
        />
        </div>
      </div>
    )
  }
}
