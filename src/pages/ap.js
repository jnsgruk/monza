import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Grid, Typography, List, Divider } from "@material-ui/core"

import ListItem from "../components/list-item"
import Map from "../components/map"
import GenericTable from "../components/tables/generic-table"

class AP extends Component {
  render = () => {
    const { datafile, match } = this.props
    if (Object.keys(datafile).length) {
      const { aps, clients, bridged, other } = datafile
      const matchedAPs = aps.filter(ap => ap["Device MAC"] === match.params.mac)
      const ap = matchedAPs.length ? matchedAPs[0] : null
      if (ap) {
        const macs = ap["Clients"].map(c => c["Key"])
        const apclients = [...clients, ...bridged, ...other].filter(c =>
          macs.includes(c["Key"])
        )
        return (
          <div>
            <Typography variant="title">{ap["SSID"]}</Typography>
            <Typography variant="subheading">{ap["Device MAC"]}</Typography>
            <Divider />
            <Grid container spacing={16} style={{ paddingTop: 20 }}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <List>
                  <ListItem
                    primary={`${ap["Type"]}`}
                    secondary={"Type"}
                    icon="class"
                  />
                  <ListItem
                    primary={`${ap["Latitude"]}, ${ap["Longitude"]}`}
                    secondary={"Position"}
                    icon="gps_fixed"
                  />
                  <ListItem
                    primary={`${ap["SSID"]}`}
                    secondary={"SSID"}
                    icon="wifi"
                  />
                  <ListItem
                    primary={`${ap["Device MAC"]}`}
                    secondary={"BSSID"}
                    icon="wifi"
                  />
                  <ListItem
                    primary={`${ap["First Seen"]}`}
                    secondary={"First Seen"}
                    icon="access_time"
                  />
                  <ListItem
                    primary={`${ap["Last Seen"]}`}
                    secondary={"Last Seen"}
                    icon="access_time"
                  />
                </List>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Map
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDLtmMaLICUV7l6OfIl9rW2vdsXXc31s4M&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: "100%" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: 400 }} />}
                  lat={ap["Latitude"]}
                  lon={ap["Longitude"]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="title">Clients</Typography>
                <GenericTable display={5} rows={apclients} />
              </Grid>
            </Grid>
          </div>
        )
      }
      return <Typography>AP not found!</Typography>
    } else {
      return <Redirect to="/" />
    }
  }
}

const mapState = ({ datafile }) => ({ datafile })

export default connect(mapState)(AP)
