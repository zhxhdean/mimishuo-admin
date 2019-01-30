import React, { Component } from 'react'
import {Divider,Button,Table,Input,Tooltip,message,Icon} from 'antd'
import { observer,inject } from 'mobx-react';
import './index.less'
import {
  DEFAULT_PAGEINDEX,
  DEFAULT_PAGESIZE,
  getCategory
} from '../../common/constant'
import moment from 'moment'
const Search = Input.Search

@inject('rootStore','wordLibraryStore')
@observer
export default class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRows: []
    }
  }
  componentDidMount(){
    this.loadData(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE)
  }

  loadData(pageIndex, pageSize, keyword = '') {
    this.props.rootStore.showLoading()
    this.props.wordLibraryStore
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
      this.props.wordLibraryStore.setKeyWord(value)
      this.loadData(DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, value)
    }
  
    // 分页、
    handleChange = (pagination, filters, sorter) => {
      this.loadData(
        pagination.current,
        DEFAULT_PAGESIZE,
        this.props.wordLibraryStore.keyword
      )
    }

  handleImport = id => {
    this.props.rootStore.showLoading()
    this.props.wordLibraryStore.import(id).then(rsp =>{
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        message.success('导入成功')
      }else{
        message.error(rsp.content)
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.success('导入遇到错误')
    })
  }

  handleBatchImport = () => {
    
    if(this.state.selectedRows.length === 0){
      message.error('请选择要导入的数据')
      return
    }

    this.props.rootStore.showLoading()
    this.props.wordLibraryStore.batchImport(this.state.selectedRows).then(rsp =>{
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        message.success('导入成功')
      }else{
        message.error(rsp.content)
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.success('导入遇到错误')
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
        dataIndex: 'wordName',
        title: '主题'
      },
      {
        dataIndex: 'wordTypeId',
        title: '类型',
        render: text => getCategory(text)
      },
      {
        dataIndex: 'similarWord',
        title: '相关近义词',
        width: 300
      },{
        dataIndex: 'createTime',
        title: '添加时间',
        render: text => new moment(text).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          /*eslint-disable no-script-url */
          return (
            <span>
              <Tooltip title="加入我的词库">
                <a href="javascript:;" onClick={this.handleImport.bind(this, record.id)}>加入我的词库</a>
              </Tooltip>
            </span>
          )
        }
      }
    ]

    const { wordLibraryList, current, total } = this.props.wordLibraryStore
    const dataSource = wordLibraryList.map(item => item)
    const { loading } = this.props.rootStore
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows: selectedRows.map(item => +item.id) })
      }
    }
    return (
      <div className="word-library">
        <h2>屏蔽词库         {/*eslint-disable no-script-url*/}
          <a href="javascript:void(0);" onClick={() => this.props.history.goBack()}><Icon type="caret-left" />返回</a>
          </h2> 
        <Divider />
        <div>
          <Search
            style={{ width: 300 }}
            placeholder="请输入关键字"
            onSearch={this.handleSearch}
            enterButton
          />
          <Button type="primary" className="ml20" onClick={this.handleBatchImport}>
            批量导入
          </Button>
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
