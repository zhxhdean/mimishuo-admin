import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message, Input, Table, Divider, Tooltip } from 'antd'
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
  render() {
    const { loading } = this.props.rootStore
    const { current, total, newsLetterList } = this.props.newsLetterStore
    const columns = [
      {
        dataIndex: 'id',
        title: '序号'
      },
      {
        dataIndex: 'title',
        title: '标题',
        render: text => (
          <div className="word-hide wd150">
            <Tooltip title={text}>{text}</Tooltip>
          </div>
        )
      },
      {
        dataIndex: 'status',
        title: '状态',
        render: text => getSecretStatus(text)
      },
      {
        dataIndex: 'createTime',
        title: '发布时间'
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
            <span>
              <Tooltip title="查看详情">
                <a href="javascript:;">详情</a>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="撤回">
                <a href="javascript:;">撤回</a>
              </Tooltip>
            </span>
          )
        }
      }
    ]
    return (
      <div className="secret-list">
        <h2>NewsLetter列表</h2>
        <Divider />
        <div>
          <Search
            style={{ width: 300 }}
            placeholder="请输入关键字"
            onSearch={this.handleSearch}
            enterButton
          />

          <Table
            rowKey="id"
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
