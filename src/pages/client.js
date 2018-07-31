import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Grid, Typography, List, Divider } from "@material-ui/core"

import ListItem from "../components/list-item"
import Map from "../components/map"
import APTable from "../components/tables/ap-table"
import ProbeTable from "../components/tables/probe-table"

class Client extends Component {
  render = () => {
    const { datafile, match } = this.props
    if (Object.keys(datafile).length) {
      const { aps, clients, bridged, other } = datafile
      const allClients = [...clients, ...bridged, ...other]
      const matchedClients = allClients.filter(
        c => c["Device MAC"] === match.params.mac
      )
      const client = matchedClients.length ? matchedClients[0] : null
      if (client) {
        const macs = client["APs"].map(c => c["Key"])
        const clientAPs = aps.filter(c => macs.includes(c["Key"]))
        return (
          <div>
            <Typography variant="title">{client["SSID"]}</Typography>
            <Typography variant="subheading">{client["Device MAC"]}</Typography>
            <Divider />
            <Grid container spacing={16} style={{ paddingTop: 20 }}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <List>
                  <ListItem
                    primary={`${client["Type"]}`}
                    secondary={"Type"}
                    icon="class"
                  />
                  <ListItem
                    primary={`${client["Latitude"]}, ${client["Longitude"]}`}
                    secondary={"Position"}
                    icon="gps_fixed"
                  />
                  <ListItem
                    primary={`${client["Device MAC"]}`}
                    secondary={"BSSID"}
                    icon="wifi"
                  />
                  <ListItem
                    primary={`${client["First Seen"]}`}
                    secondary={"First Seen"}
                    icon="access_time"
                  />
                  <ListItem
                    primary={`${client["Last Seen"]}`}
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
                  lat={client["Latitude"]}
                  lon={client["Longitude"]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="title">APs</Typography>
                <APTable display={5} aps={clientAPs} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="title">Probes</Typography>
                <ProbeTable
                  display={5}
                  rows={client["Probes"].map(p => p["SSID"])}
                />
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

export default connect(mapState)(Client)
