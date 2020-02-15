import React, { Component } from 'react'
import { Empty } from 'antd';
export default class Error404 extends Component {
  render() {
    return (
      <div style={{ width:'100vw', height:'100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{ fontSize:'22px', color:'rgba(0,0,0,0.25)'}}>
        Page Not Found 404
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
      </div>
    )
  }
}
