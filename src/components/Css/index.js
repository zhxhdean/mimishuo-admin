import React, { Component } from 'react'
import './index.less'
export default class index extends Component {
  handleMove = (e) => {
    e.target.className = e.target.className === 'transition1' ? 'transition' : 'transition1'
  }
  handleScale = e => {
    e.target.className = e.target.className === 'scale' ? 'scale1' : 'scale'
  }
  render() {
    return (
      <div className="main">
      <div className="triangle">
      </div>

      <div className="triangle1">
        
      </div>

      <div className="shadow">阴影演示</div>
      <div className="rotate">
      animation动画演示
      </div>

      <div className="rotate1">
        旋转演示
      </div>
      
      <div className="translate"></div>

      <div className="scale" onClick={this.handleScale}>请点击我</div>

      <div className="transition" onClick={this.handleMove}>请点击我</div>
      </div>
    )
  }
}
