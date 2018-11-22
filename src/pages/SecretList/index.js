import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Input, Table, message, Tooltip, Button } from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react'
import { DEFAULT_PAGESIZE, DEFAULT_PAGEINDEX } from '../../common/constant'
import ReplySecret from '../../components/ReplySecret'
import NewsLetterPendingList from '../../components/NewsLetterPendingList'
import downLoad from '../../common/js2execl'
import {SECRET_STATUS, getSecretStatus} from '../../common/constant'
const Search = Input.Search

@inject('secretListStore', 'rootStore', 'pendingListStore')
@observer
export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedNewsLetters: []
    }
  }
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.secretListStore
      .getList(
        this.props.secretListStore.current || DEFAULT_PAGEINDEX,
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

  // 搜索
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

  // 表格分页、筛选、排序
  handleChange = (pagination, filters, sorter) => {
    const { status } = filters
    this.props.rootStore.showLoading()
    this.props.secretListStore
      .getList(
        pagination.current,
        DEFAULT_PAGESIZE,
        this.props.secretListStore.keyword,
        { status: status }
      )
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载失败')
        this.props.rootStore.hideLoading()
      })
  }

  // 单条加入清单
  handleJoinNewsLetter = (obj, e) => {
    // this.props.rootStore.showNewsLetter()
    this.props.pendingListStore.join(obj)
  }

  // 批量加入清单
  handleBatchJoin = () => {
    if(this.state.selectedNewsLetters.length === 0){
      message.error('请选择要加入清单的数据项！')
      return
    }
    this.props.pendingListStore.batchJoin(this.state.selectedNewsLetters)

    console.log(this.state.selectedNewsLetters)
  }

  // 导出数据
  handleExport = () => {
    // todo 全集导出
    const data = this.props.secretListStore.secretList.map(item => {
      return {
        '主题': item.title,
        '创建时间': item.createTime,
        '点击阅读量': item.viewCount,
        '点赞人数': item.voteCount,
        '发布状态': getSecretStatus(item.status),
        '阅后即焚': item.remove ? '是' : '否'
      }
    })
    downLoad(data)
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
        key: 'title',
        render: (text,record) => {
          return (<Link to={{ pathname: `secret/detail/${record.id}` }}>{text}</Link>)
        }
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
          return getSecretStatus(text)
        },
        filters: [
          { text: '初始', value: SECRET_STATUS.INIT },
          { text: '待发布', value: SECRET_STATUS.PRE_PUBLISH },
          { text: '发布中', value: SECRET_STATUS.PUBLISHING },
          { text: '已发布', value: SECRET_STATUS.PUBLISHED }
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
            <span><Tooltip title="快速回复问题">
              <a
                href="javascript:;"
                onClick={this.props.secretListStore.showQuickReply.bind(
                  this,
                  true,
                  record
                )}
              >
                回复
              </a></Tooltip>
              <Divider type="vertical" />
              <Tooltip title="加入发布清单">
              <a
                href="javascript:;"
                onClick={this.handleJoinNewsLetter.bind(this, record)}
              >
                加入
              </a></Tooltip>
            </span>
          )
        }
      }
    ]

    const { secretList, current, total } = this.props.secretListStore

    const { loading } = this.props.rootStore
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedNewsLetters: selectedRows})
        // console.log(
        //   `selectedRowKeys: ${selectedRowKeys}`,
        //   'selectedRows: ',
        //   selectedRows
        // )
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
          <Button type="primary" className="ml20" onClick={this.handleBatchJoin}>批量加入清单</Button>
          <Button className="ml20" onClick={this.props.rootStore.showNewsLetter}>清单</Button>
          <Button className="ml20" onClick={this.handleExport}>导出</Button>
          <a href="" download="秘密列表.xlsx" id="hf">
                {" "}
              </a>
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
        <NewsLetterPendingList/>
      </div>
    )
  }
}
