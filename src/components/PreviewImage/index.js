/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { Modal } from 'antd'
import Slider from "react-slick"
import { inject, observer } from 'mobx-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

@inject('rootStore')
@observer
export default class index extends Component {
  render() {
    const settings = {
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    
    return (
      
      <div>
        {this.slider && this.slider.slickGoTo(this.props.rootStore.carouseIndex)}
        <Modal width={800} closable={false} bodyStyle={{background: 'rgba(0,0,0,.7)', paddingLeft: '40px', paddingRight: '40px'}} footer={null} visible={this.props.rootStore.carouselModal} onCancel={this.props.rootStore.hideCarouse}>
        <Slider {...settings} ref={slider => (this.slider = slider)}>
          {this.props.img && this.props.img.map((item,index) =>{
            return (<div key={`preview-${index}`}>
             <h3><img src={item} alt="图片描述" width='100%' title={`当前是第${this.props.rootStore.carouseIndex+1}张图片`}/></h3> 
            </div>)
          })}
        </Slider>
        </Modal>
      </div>
    )
  }
}
