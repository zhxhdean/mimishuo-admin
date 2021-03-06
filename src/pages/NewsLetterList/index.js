/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message, Input, Table, Divider, Tooltip } from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGESIZE,
  getSecretStatus
} from '../../common/constant'

const Search = Input.Search
@inject('rootStore', 'newsLetterStore')
@observer
export default class index extends Component {
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.newsLetterStore
      .getList(
        this.props.newsLetterStore.current || DEFAULT_PAGEINDEX,
        DEFAULT_PAGESIZE
      )
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }

  handleSearch = value => {
    this.props.newsLetterStore.setKeyword(value)
    this.props.rootStore.showLoading()
    this.props.newsLetterStore
      .getList(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, value)
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }

  handleChange = page => {
    this.props.rootStore.showLoading()
    this.props.newsLetterStore
      .getList(page, DEFAULT_PAGESIZE, this.props.newsLetterStore.keyword)
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }

  // 撤回
  handleRecall = id => {
    //todo 撤回
    this.props.rootStore.showLoading()
    this.props.newsLetterStore.recall(id).then(rsp => {
      this.props.rootStore.hideLoading()
      console.log(rsp)
      if(rsp.data && rsp.code === 0){
        message.success('撤回成功')
        const index = this.props.newsLetterStore.newsLetterList.find(item => item.newsLetterId === id)
        this.props.newsLetterStore.newsLetterList.splice(index, 1)
      }else{
        message.error('撤回失败')
      }
    }).catch(err => {
      message.error('失败')
      this.props.rootStore.hideLoading()
    })
  }
  render() {
    const { loading } = this.props.rootStore
    const { current, total, newsLetterList } = this.props.newsLetterStore
    const columns = [
      {
        dataIndex: 'newsLetterId',
        title: '序号'
      },
      {
        dataIndex: 'title',
        title: '标题',
        render: (text,record) => (
          <div className="word-hide wd150">
            <Tooltip title={text}><Link to={`/newsletter/detail/${record.newsLetterId}`}>{record.title}</Link></Tooltip>
          </div>
        )
      },
      {
        dataIndex: 'status',
        title: '状态',
        render: text => text === 1 ? '发布中' : '已发布'
      },
      {
        dataIndex: 'publishTime',
        title: '发布时间',
        render: text => text && new moment(text).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        dataIndex: 'content',
        title: '内容',
        render: text => (
          <div className="word-hide wd300">
            <Tooltip title={text}>{text}</Tooltip>
          </div>
        )
      },
      {
        dataIndex: 'action',
        title: '操作',
        render: (text, record) => {
          return (
            // todo 撤回
            <span>
              <Tooltip title="查看详情">
                <Link to={`/newsletter/detail/${record.newsLetterId}`}>详情</Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="撤回">
              { /*eslint-disable no-script-url*/}
                <a href="javascript:void(0);" onClick={this.handleRecall.bind(this, record.newsLetterId)}>撤回</a> 
              </Tooltip>
            </span>
          )
        }
      }
    ]
    return (
      <div className="secret-list">
        <h2>周刊列表</h2>
        <Divider />
        <div>
          <Search
            style={{ width: 300 }}
            placeholder="请输入关键字"
            onSearch={this.handleSearch}
            enterButton
          />

          <Table
            rowKey="newsLetterId"
            loading={loading}
            pagination={{
              current: current,
              total: total,
              showQuickJumper: true,
              onChange: this.handleChange
            }}
            dataSource={newsLetterList}
            columns={columns}
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    )
  }
}
