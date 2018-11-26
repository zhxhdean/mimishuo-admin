import React, { Component } from 'react'
import { Divider, Tooltip, Input, Button, Table, message,Modal } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGESIZE,
  getCategory
} from '../../common/constant'
import jsxlxs from '../../common/js2execl'
import AddShieldedWord from '../../components/AddShieldedWord'
const Search = Input.Search
@inject('shieldedWordStore', 'rootStore')
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
    this.props.shieldedWordStore
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
    this.props.shieldedWordStore.setKeyWord(value)
    this.loadData(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, value)
  }

  // 分页、
  handleChange = (pagination, filters, sorter) => {
    this.loadData(
      pagination.current,
      DEFAULT_PAGESIZE,
      this.props.shieldedWordStore.keyword
    )
  }

  // 导出
  handleExport = () => {
    // todo 全集导出
    const data = this.props.shieldedWordStore.shieldedWordList.map(item => {
      return {
        主题: item.title,
        创建时间: item.createTime,
        相关近义词: item.similar,
        分类: getCategory(item.category)
      }
    })
    jsxlxs.exportFile(data)
  }

  // 删除当前行
  handleDelete = id => {
    const self = this
    Modal.confirm({
      title: '提示',
      content: '请确定要删除当前行数据？',
      onOk(){
        self.props.rootStore.showLoading()
        self.props.shieldedWordStore.delete(id).then(rsp => {
          if(rsp.code === 0){
            message.success('删除成功')
          }else{
            message.error(rsp.content)
          }
          self.props.rootStore.hideLoading()
        }).catch(err => {
          message.error('删除错误')
          self.props.rootStore.hideLoading()
        })
      }
    })
  }

  //批量删除
  handleBatchDelete = () => {
    const self = this
    if(this.state.selectedRows.length === 0){
      message.error('请选择要删除的数据')
      return
    }
    Modal.confirm({
      title: '提示',
      content: '请确定要删除当前选择的数据？',
      onOk(){
        self.props.rootStore.showLoading()
        self.props.shieldedWordStore.batchDelete(self.state.selectedRows).then(rsp => {
          if(rsp.code === 0){
            message.success('删除成功')
          }else{
            message.error(rsp.content)
          }
          self.props.rootStore.hideLoading()
        }).catch(err => {
          message.error('删除错误')
          self.props.rootStore.hideLoading()
        })
      }
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
        title: '主题'
      },
      {
        dataIndex: 'category',
        title: '类型',
        render: text => getCategory(text)
      },
      {
        dataIndex: 'similar',
        title: '相关近义词',
        width: 300
      },{
        dataIndex: 'createTime',
        title: '添加时间'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          /*eslint-disable no-script-url */
          return (
            <span>
              <Tooltip title="删除当前行">
                <a href="javascript:;" onClick={this.handleDelete.bind(this, record.id)}>删除</a>
              </Tooltip>
            </span>
          )
        }
      }
    ]

    const { shieldedWordList, current, total } = this.props.shieldedWordStore
    const dataSource = shieldedWordList.map(item => item)
    const { loading } = this.props.rootStore
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows: selectedRows.map(item => +item.id) })
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
          <Button type="primary" className="ml20" onClick={this.handleBatchDelete}>
            批量删除
          </Button>
          <Button className="ml20" onClick={this.props.shieldedWordStore.showAddShieldedWord}>新增</Button>
          <Button className="ml20" onClick={()=>this.props.history.push({pathname: '/wordlibrary'})}>从词库导入</Button>
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

          <AddShieldedWord />
        </div>
      </div>
    )
  }
}
