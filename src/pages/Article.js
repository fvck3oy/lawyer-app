import React, { Component } from 'react'
import axios from 'axios'
import url from '../url_config'

export default class Article extends Component {
  state = {
    data: {}
  }
  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {

    await axios.get(`${url}/blogs/${this.props.match.params.id}`).then(res => {
      const { data } = res

      this.setState({ data });
      console.log("Data : ", data);

    })
  }
  render() {
    return (
      <div>
        ar
      </div>
    )
  }
}
