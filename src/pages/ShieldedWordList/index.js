import React, { Component } from 'react'
import { Divider, Tooltip, Input, Button, Table, message } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGESIZE,
  getCategory
} from '../../common/constant'
import jsxlxs from '../../common/js2execl'
const Search = Input.Search
@inject('shieledWordStore', 'rootStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRows: []
    }
  }

  componentDidMount() {
    this.loadData(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE)
  }

  loadData(pageIndex, pageSize, keyword = '') {
    this.props.rootStore.showLoading()
    this.props.shieledWordStore
      .getList(pageIndex, pageSize, keyword)
      .then(rsp => {
        if (rsp.code !== 0) {
          message.error(rsp.content)
        }
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载遇到错误')
        this.props.rootStore.hideLoading()
      })
  }

  // 搜索
  handleSearch = value => {
    this.props.shieledWordStore.setKeyWord(value)
    this.loadData(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, value)
  }

  // 分页、
  handleChange = (pagination, filters, sorter) => {
    this.loadData(
      pagination.current,
      DEFAULT_PAGESIZE,
      this.props.shieledWordStore.keyword
    )
  }

  // 导出
  handleExport = () => {
    // todo 全集导出
    const data = this.props.shieledWordStore.shieldedWordList.map(item => {
      return {
        主题: item.title,
        创建时间: item.createTime,
        相关近义词: item.similar,
        分类: getCategory(item.category)
      }
    })
    jsxlxs.exportFile(data)
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
        title: '主题'
      },
      {
        dataIndex: 'category',
        title: '类型',
        render: text => getCategory(text)
      },
      {
        dataIndex: 'similar',
        title: '相关近义词'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          /*eslint-disable no-script-url */
          return (
            <span>
              <Tooltip title="删除当前行">
                <a href="javascript:;">删除</a>
              </Tooltip>
            </span>
          )
        }
      }
    ]

    const { shieldedWordList, current, total } = this.props.shieledWordStore
    const dataSource = shieldedWordList.map(item => item)
    const { loading } = this.props.rootStore
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows: selectedRows })
      }
    }
    return (
      <div>
        <h2>屏蔽词管理</h2>
        <Divider />
        <div>
          <Search
            style={{ width: 300 }}
            placeholder="请输入关键字"
            onSearch={this.handleSearch}
            enterButton
          />
          <Button type="primary" className="ml20">
            批量删除
          </Button>
          <Button className="ml20">新增</Button>
          <Button className="ml20">从系统中导入</Button>
          <Button className="ml20" onClick={this.handleExport}>
            导出
          </Button>
          <a href="" download="newsletter列表.xlsx" id="hf">
            {' '}
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
            dataSource={dataSource}
            columns={columns}
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    )
  }
}
