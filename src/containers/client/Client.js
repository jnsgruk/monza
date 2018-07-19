import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"

import Map from "../../components/map/Map"
import APTable from "../../components/tables/APTable"
import ProbeTable from "../../components/tables/ProbeTable"

import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  main: {
    margin: "0 auto",
    marginTop: 70,
    width: "100%",
    fontFamily: "Roboto !important",
  },
  mainPaper: {
    padding: 20,
  },
  subMain: {
    paddingTop: 20,
  },
})

class Client extends Component {
  render = () => {
    const { classes, datafile, match } = this.props
    if (Object.keys(datafile).length > 0) {
      const { aps, clients, bridged, other } = datafile
      const allClients = clients.concat(bridged).concat(other)
      const matchedClients = allClients.filter(
        c => c["Device MAC"] === match.params.mac
      )
      const client = matchedClients.length > 0 ? matchedClients[0] : null
      if (client) {
        const macs = client["APs"].map(c => c["Key"])
        const clientAPs = aps.filter(c => macs.includes(c["Key"]))
        return (
          <Grid container spacing={16} className={classes.main}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper className={classes.mainPaper}>
                <Typography variant="title">{client["SSID"]}</Typography>
                <Typography variant="subheading">
                  {client["Device MAC"]}
                </Typography>
                <Divider />
                <Grid container spacing={16} className={classes.subMain}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>class</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${client["Type"]}`}
                          secondary={"Type"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>gps_fixed</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${client["Latitude"]}, ${
                            client["Longitude"]
                          }`}
                          secondary={"Position"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>wifi</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${client["Device MAC"]}`}
                          secondary={"BSSID"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>access_time</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${client["First Seen"]}`}
                          secondary={"First Seen"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>access_time</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={`${client["Last Seen"]}`}
                          secondary={"Last Seen"}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Map
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDLtmMaLICUV7l6OfIl9rW2vdsXXc31s4M&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: "100%" }} />}
                      mapElement={<div style={{ height: "100%" }} />}
                      containerElement={
                        <div
                          style={{
                            height: 400,
                            transition: "height linear .1s",
                          }}
                        />
                      }
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
              </Paper>
            </Grid>
          </Grid>
        )
      }
      return <Typography>AP not found!</Typography>
    } else {
      return <Redirect to="/" />
    }
  }
}

const mapState = state => {
  const datafile = state.datafile
  return { datafile }
}

const mapDispatch = dispatch => ({
  update: payload => dispatch.datafile.update(payload),
})

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(Client)
)
