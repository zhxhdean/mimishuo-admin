import React, { Component } from 'react'
import { Divider, Input, Table } from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react';

const Search = Input.Search

@inject('secretListStore', 'rootStore')
@observer
export default class index extends Component {

  componentDidMount (){
    this.props.secretListStore.getList(1, 20)
  }
  render() {
    const columns = [
      {
        dataIndex: 'id',
        title: '序号'
      },
      {
        dataIndex: 'title',
        title: '主题'
      },
      {
        dataIndex: 'createTime',
        title: '创建时间'
      },
      {
        dataIndex: 'viewCount',
        title: '点击阅读量'
      },
      {
        dataIndex: 'voteCount',
        title: '点赞人数'
      },
      {
        dataIndex: 'reply',
        title: '是否回复',
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
        }
      },
      {
        dataIndex: 'remove',
        title: '阅后即焚',
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
        render: (text, record) => {
          return (
            <span>
              <a href="javascript:void(0);">详情</a>
              <Divider type="vertical" />
              <a href="javascript:void(0);">回复</a>
            </span>
          )
        }
      }
    ]
    
    const dataSource = this.props.secretListStore.secretList

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
            onSearch={value => console.log(value)}
            enterButton
          />

          <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} style={{marginTop: '20px'}}/>
        </div>
      </div>
    )
  }
}
