import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Grid from "material-ui/Grid"
import Paper from "material-ui/Paper"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import Icon from "material-ui/Icon"

import Map from "../../components/map/Map"
import GenericTable from "../../components/tables/GenericTable"

import { withStyles } from "material-ui/styles"

const styles = theme => ({
  main: {
    margin: "0 auto",
    marginTop: 70,
    width: "100%",
    fontFamily: "Roboto !important",
  },
  mainPaper: {
    padding: 20
  },
  subMain: {
    paddingTop: 20
  }

})

class AP extends Component {
  render = () => {
    const { classes, datafile, match } = this.props
    if (Object.keys(datafile).length > 0) {
      const { aps, clients, bridged, other } = datafile
      const matchedAPs = aps.filter(ap => ap["Device MAC"] === match.params.mac)
      const ap = matchedAPs.length > 0 ? matchedAPs[0] : null
      if (ap) {
        const macs = ap["Clients"].map(c => c["Key"])
        const apclients = [...clients, ...bridged, ...other].filter(c => macs.includes(c["Key"]))
        return (
          <Grid container spacing={16} className={classes.main}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper className={classes.mainPaper}>
                <Typography variant="title">{ap["SSID"]}</Typography>
                <Typography variant="subheading">{ap["Device MAC"]}</Typography>
                <Divider/>
                <Grid container spacing={16} className={classes.subMain}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <List>
                      <ListItem>
                        <ListItemIcon><Icon>class</Icon></ListItemIcon>
                        <ListItemText primary={`${ap["Type"]}`} secondary={"Type"} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Icon>gps_fixed</Icon></ListItemIcon>
                        <ListItemText primary={`${ap["Latitude"]}, ${ap["Longitude"]}`} secondary={"Position"} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Icon>wifi</Icon></ListItemIcon>
                        <ListItemText primary={`${ap["SSID"]}`} secondary={"SSID"} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Icon>wifi</Icon></ListItemIcon>
                        <ListItemText primary={`${ap["Device MAC"]}`} secondary={"BSSID"} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Icon>access_time</Icon></ListItemIcon>
                        <ListItemText primary={`${ap["First Seen"]}`} secondary={"First Seen"} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Icon>access_time</Icon></ListItemIcon>
                        <ListItemText primary={`${ap["Last Seen"]}`} secondary={"Last Seen"} />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Map 
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDLtmMaLICUV7l6OfIl9rW2vdsXXc31s4M&libraries=geometry,drawing,places"
                      loadingElement={<div style={{height: "100%"}}/>}
                      mapElement={<div style={{height: "100%"}}/>}
                      containerElement={<div style={{height: 400, transition: "height linear .1s"}}/>}
                      lat={ap["Latitude"]} 
                      lon={ap["Longitude"]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="title">Clients</Typography>
                    <GenericTable display={5} rows={apclients}/>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )
      }
      return <Typography>AP not found!</Typography> 
    }
    else {
      return <Redirect to="/" />
    }
  }
}

const mapState = state => {
  const datafile = state.datafile
  return { datafile }
}

const mapDispatch = dispatch => ({ 
    update: (payload) => dispatch.datafile.update(payload),
})

export default withStyles(styles)(connect(mapState, mapDispatch)(AP))