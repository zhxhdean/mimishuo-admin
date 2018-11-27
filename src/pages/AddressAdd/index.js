import React, { Component } from 'react'
import { Icon, Divider, Input,message,Button } from 'antd'
import './index.less'
import { inject,observer } from 'mobx-react';
const Search = Input.Search

@inject('addressStore','rootStore')
@observer
export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      cityCode: '' || '010'
    }
  }
  componentDidMount() {
    let tag = document.createElement('script')
    tag.type = 'text/javascript'
    tag.src =
      'https://webapi.amap.com/maps?v=1.4.6&key=d0e7001dedeb866445f257ea4aa03362'
    let root = document.getElementById('root')
    root.appendChild(tag)

    const self = this
    // 加载完成
    tag.onload = () => {
       let map = new window.AMap.Map('container', {
        resizeEnable: true
      })
      window.map = map
      self.props.rootStore.showLoading()
      window.AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition(function(status, result) {
          self.props.rootStore.hideLoading()
          if (status === 'complete') {
            self.onComplete(result, self)
          } else {
            self.onError(result, self)
          }
        })
      })
    }
  }
  handleSearch = value => {
    this.props.addressStore.setValue('address', value)
    this.props.rootStore.showLoading()
    const self = this
    window.AMap.plugin('AMap.Geocoder', function(){
      const geocoder =new window.AMap.Geocoder({city: self.state.cityCode})
      let marker = ''
      geocoder.getLocation(value, (status, result) => {
        self.props.rootStore.hideLoading()
        if (status === 'complete' && result.geocodes.length) {
          const lnglat = result.geocodes[0].location
          self.props.addressStore.setValue('lng', lnglat.lng)
          self.props.addressStore.setValue('lat', lnglat.lat)
          document.getElementById('result') && (document.getElementById('result').innerHTML = lnglat)
          if (!marker) {
            marker = new window.AMap.Marker()
            window.map.add(marker)
          }
          marker.setPosition(lnglat)
          window.map.setFitView(marker)
        }else{
          message.error('搜索失败')
        }
      })
    })
  
  }

  handlSubmit = () =>{
    if(!this.props.addressStore.address.address){
      message.error('请输入公司地址')
      return
    }
    this.props.rootStore.showLoading()
    this.props.addressStore.add().then(rsp => {
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        message.success('添加成功')
      }else{
        message.error('添加失败')
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('添加失败')
    })
  }

  //解析定位结果
  onComplete(data, self) {
    // document.getElementById('status').innerHTML='定位成功'
    var str = []
    self.setState({cityCode: data.addressComponent.cityCode})
    str.push('定位结果：' + data.position)
    str.push('定位类别：' + data.location_type)
    if (data.accuracy) {
      str.push('精度：' + data.accuracy + ' 米')
    } //如为IP精确定位结果则没有精度信息
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
    document.getElementById('result') && (document.getElementById('result').innerHTML = str.join('<br>'))
  }
  //解析定位错误信息
  onError(data,self) {
    self.setState({cityCode: '021'})
    // document.getElementById('status').innerHTML='定位失败'
    document.getElementById('result') && (document.getElementById('result').innerHTML =
      '失败原因排查信息:' + data.message)
  }

  render() {
    return (
      <div className="address-add">
        {/* eslint-disable no-script-url */}
        <h2>
          新增地址{' '}
          <a
            href="javascript:void(0)"
            onClick={() => this.props.history.goBack()}
          >
            <Icon type="caret-left" />
            返回
          </a>
        </h2>
        <Divider />
        <Search
          placeholder="请输入公司地址"
          className="wd300"
          onSearch={this.handleSearch}
          enterButton
        />
        <Button type="primary" className="ml20" onClick={this.handlSubmit}>确定添加</Button>
        <div id="result" />
        <div id="container" />
      </div>
    )
  }
}
