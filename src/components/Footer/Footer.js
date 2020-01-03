import React, { Component } from 'react'
import LineContact from '../../components/LineContact/LineContact'
export default class Footer extends Component {
  render() {
    return (
      <div className="footer" style={{ textAlign: 'center', padding: '20px', color: 'black', backgroundColor: '#f90', width:'100%' }}>
        <LineContact />
      </div>
    )
  }
}
