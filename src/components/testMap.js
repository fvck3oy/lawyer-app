

import React, { Component } from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, SearchBox } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7znYiqytpFwvWR0wIfDHWBGH7BZQ1PWU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        position: null,
        onMarkerMounted: ref => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          console.log("Position : ",position.toString());
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  // <GoogleMap
  //   defaultZoom={18}
  //   defaultCenter={{ lat: 7.890030, lng: 98.398180 }}
  // >
  //   {props.isMarkerShown && <Marker position={{ lat: 7.890030, lng: 98.398180 }} onClick={props.onMarkerClick} />}
  // </GoogleMap>

  <GoogleMap defaultZoom={18} defaultCenter={{ lat: 7.890030, lng: 98.398180 }}>
    <Marker position={{ lat: 7.890030, lng: 98.398180 }} draggable={true} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged}/>
  </GoogleMap>
)

export default class TestMap extends Component {
  state = {
    isMarkerShown: true,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}