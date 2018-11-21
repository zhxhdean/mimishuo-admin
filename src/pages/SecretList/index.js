import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Divider, Input, Table, message } from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react'
import { DEFAULT_PAGESIZE, DEFAULT_PAGEINDEX } from '../../common/constant'
import ReplySecret from '../../components/ReplySecret'

const Search = Input.Search

@inject('secretListStore', 'rootStore')
@observer
export default class index extends Component {
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.secretListStore
      .getList(this.props.secretListStore.current || DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE)
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }



  handleSearch = value => {
    this.props.secretListStore.setKeyword(value)
    this.props.rootStore.showLoading()
    this.props.secretListStore
      .getList(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, value)
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }

  handleChange = (pagination, filters, sorter) => {
    const {status} = filters
    this.props.rootStore.showLoading()
    this.props.secretListStore
      .getList(pagination.current, DEFAULT_PAGESIZE, this.props.secretListStore.keyword, {status: status})
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }

  render() {
    const columns = [
      {
        dataIndex: 'id',
        title: '序号',
        key: 'id'
      },
      {
        dataIndex: 'title',
        title: '主题',
        key: 'title'
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
        key: 'createTime'
      },
      {
        dataIndex: 'viewCount',
        title: '点击阅读量',
        key: 'viewCount'
      },
      {
        dataIndex: 'voteCount',
        title: '点赞人数',
        key: 'voteCount'
      },
      {
        dataIndex: 'reply',
        title: '是否回复',
        key: 'reply',
        render: text => {
          if (text) {
            return '已回复'
          } else {
            return <span className="red">未回复</span>
          }
        }
      },
      {
        dataIndex: 'status',
        key: 'status',
        title: '发布状态',
        render: text => {
          if (text === 1) {
            return '初始'
          } else if (text === 2) {
            return '待发布'
          } else if (text === 3) {
            return '发布中'
          } else if (text === 4) {
            return '已发布'
          } else {
            return '未知'
          }
        },
        filters: [
          { text: '初始', value: 1 },
          { text: '待发布', value: 2 },
          { text: '发布中', value: 3 },
          { text: '已发布', value: 4 }
        ]
      },
      {
        dataIndex: 'remove',
        title: '阅后即焚',
        key: 'remove',
        render: text => {
          if (text) {
            return <span className="red">是</span>
          } else {
            return '否'
          }
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <Link to={{pathname: `secret/detail/${record.id}`}}>详情</Link>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={this.props.secretListStore.showQuickReply.bind(
                  this,
                  true,
                  record
                )}
              >
                回复
              </a>
            </span>
          )
        }
      }
    ]

    const { secretList, current, total } = this.props.secretListStore

    const { loading } = this.props.rootStore
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        )
      }
    }
    return (
      <div className="secret-list">
        <h2>秘密列表</h2>
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
              showQuickJumper: true
            }}
            onChange={this.handleChange}
            rowSelection={rowSelection}
            dataSource={secretList}
            columns={columns}
            style={{ marginTop: '20px' }}
          />
        </div>

        <ReplySecret />
      </div>
    )
  }
}
