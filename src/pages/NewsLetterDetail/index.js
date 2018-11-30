import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { message, Divider, Spin, Icon, Row, Col, Table, Tooltip } from 'antd'
import '../SecretDetail/index.less'
import moment from 'moment'
@inject('rootStore', 'newsLetterDetailStore')
@observer
export default class index extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.rootStore.showLoading()
    this.props.newsLetterDetailStore
      .getDetail(id)
      .then(rsp => {
        if (rsp.code !== 0) {
          message.error(rsp.content)
        }
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        message.error('数据加载错误')
        this.props.rootStore.hideLoading()
      })
  }

  render() {
    const { loading } = this.props.rootStore
    const { newsLetterDetail } = this.props.newsLetterDetailStore
    const columns = [
      {
        dataIndex: 'content',
        title: '内容',
        key: 'secretId',
        width: '500px',
        render: text => {
          if (text && text.length > 30) {
            return <Tooltip title={text}>{text.substr(0, 30) + '...'}</Tooltip>
          } else {
            return <Tooltip title={text}>{text}</Tooltip>
          }
        }
      },
      {
        dataIndex: 'createTime',
        title: '发布时间',
        align: 'center',
        render: text => new moment(text).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        dataIndex: 'action',
        title: '操作',
        align: 'center',
        render: (text, record) => {
          /*eslint-disable no-script-url*/
          return (
            <span>
              <Link to={`/secret/detail/${record.secretId}`}>详情</Link>{' '}
              <Divider type="vertical" /> <a href="javascript:void(0)">撤回</a>{' '}
              <Divider type="vertical" /> <a href="javascript:void(0)">移除</a>
            </span>
          )
        }
      }
    ]
    return (
      <div className="secret-detail-page">
        <h2>
          newsletter详情
          {/*eslint-disable no-script-url*/}
          <a
            href="javascript:void(0);"
            onClick={() => this.props.history.goBack()}
          >
            <Icon type="caret-left" />
            返回
          </a>
        </h2>
        <Divider />
        <Spin spinning={loading}>
          <Row>
            <Col span={18}>
              <h3>{newsLetterDetail.title}</h3>
            </Col>
            <Col span={4} className="black65">
              {newsLetterDetail.publishTime}
            </Col>
            <Col span={2} />
          </Row>
          <Row>
            <Col span={22} className="black65">
              {newsLetterDetail.content}
            </Col>
            <Col span={2} />
          </Row>
          <Divider />
          <h3>关联清单</h3>
          <Table
          rowKey="secretId"
            dataSource={newsLetterDetail.secretSimpleInfoList}
            pagination={false}
            columns={columns}
            scroll={{ y: 500 }}
          />
        </Spin>
      </div>
    )
  }
}
