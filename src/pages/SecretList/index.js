import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Divider,
  Input,
  Table,
  message,
  Tooltip,
  Button,
  DatePicker
} from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react'
import { DEFAULT_PAGESIZE, DEFAULT_PAGEINDEX } from '../../common/constant'
import ReplySecret from '../../components/ReplySecret'
import NewsLetterPendingList from '../../components/NewsLetterPendingList'
import jsxlxs from '../../common/js2execl'
import { SECRET_STATUS, getSecretStatus } from '../../common/constant'
import moment from 'moment'
import 'moment/locale/zh-cn'

import locale from 'antd/lib/date-picker/locale/zh_CN'
moment.locale('zh-cn')
const { RangePicker } = DatePicker

const Search = Input.Search

@inject('secretListStore', 'rootStore', 'pendingListStore')
@observer
export default class index extends Component {
  constructor(props) {
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
    console.log(filters, sorter)
    // this.props.history.push({pathname: `/secret/${pagination.current}`})
    this.props.rootStore.showLoading()
    const isReply = filters.replied && filters.replied[0] === 'true'
    const status = filters.status && filters.status[0]
    this.props.secretListStore
      .getList(
        pagination.current,
        DEFAULT_PAGESIZE,
        this.props.secretListStore.keyword,
        { isReply: isReply, status: status },
        {
          name: sorter && sorter.field,
          order: sorter && sorter.order && sorter.order.includes('desc')
        }
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
    if (this.state.selectedNewsLetters.length === 0) {
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
        主题: item.subject,
        创建时间: item.createTime,
        点击阅读量: item.viewNum,
        点赞人数: item.likeNum,
        发布状态: getSecretStatus(item.status),
        阅后即焚: item.burnAfterReading ? '是' : '否'
      }
    })
    jsxlxs.exportFile(data)
  }

  handleChangeDate = (date, dateString) => {
    console.log(date, dateString)
    this.props.secretListStore.setValue('startDate', dateString[0])
    this.props.secretListStore.setValue('endDate', dateString[1])
  }

  render() {
    const columns = [
      {
        dataIndex: 'secretId',
        title: '序号',
        key: 'secretId'
      },
      {
        dataIndex: 'content',
        title: '内容',
        width: 200,
        render: (text, record) => {
          return (
            <Link to={{ pathname: `secret/detail/${record.secretId}` }}>
              {text.substr(0, 10)}
            </Link>
          )
        }
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
        render: text => new moment(text).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        dataIndex: 'viewNum',
        title: '点击阅读量',
        sorter: (a, b) => a.viewNum - b.viewNum
      },
      {
        dataIndex: 'likeNum',
        title: '点赞人数',
        sorter: (a, b) => a.likeNum - b.likeNum
      },
      {
        dataIndex: 'replied',
        title: '是否回复',
        render: text => {
          if (text) {
            return '已回复'
          } else {
            return <span className="red">未回复</span>
          }
        },
        filters: [
          { text: '已回复', value: true },
          { text: '未回复', value: false }
        ]
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
        dataIndex: 'burnAfterReading',
        title: '阅后即焚',
        render: text => {
          if (text) {
            return <span className="red">是</span>
          } else {
            return '否'
          }
        },
        filters: [{ text: '是', value: true }, { text: '否', value: false }]
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            /*eslint-disable no-script-url*/
            <span>
              <Tooltip title="快速回复问题">
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
              </Tooltip>
              <Divider type="vertical" />
              {record.status !== 1 ? <Tooltip title="加入发布清单">
                <a
                  href="javascript:;"
                  onClick={this.handleJoinNewsLetter.bind(this, record)}
                >
                  加入
                </a>
              </Tooltip>: null}
              
            </span>
          )
        }
      }
    ]

    const { secretList, current, total } = this.props.secretListStore

    const { loading } = this.props.rootStore
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedNewsLetters: selectedRows })
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
          <RangePicker
            defaultValue={null}
            locale={locale}
            onChange={this.handleChangeDate}
            style={{ marginRight: '20px' }}
          />
          <Search
            style={{ width: 300 }}
            placeholder="请输入关键字"
            onSearch={this.handleSearch}
            enterButton
          />
          <Button
            type="primary"
            className="ml20"
            onClick={this.handleBatchJoin}
          >
            批量加入清单
          </Button>
          <Button
            className="ml20"
            onClick={this.props.rootStore.showNewsLetter}
          >
            清单
          </Button>
          <Button className="ml20" onClick={this.handleExport}>
            导出
          </Button>
          <a href="" download="秘密列表.xlsx" id="hf">
            {' '}
          </a>
          <Table
            rowKey="secretId"
            loading={loading}
            pagination={{
              current: current,
              total: total,
              pageSize: DEFAULT_PAGESIZE,
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
        <NewsLetterPendingList />
      </div>
    )
  }
}
