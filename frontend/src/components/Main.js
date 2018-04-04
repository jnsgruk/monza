import React, { Component } from "react"
import { connect } from "react-redux"

import Grid from "material-ui/Grid"
import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import Tabs, { Tab } from "material-ui/Tabs"
import AppBar from "material-ui/AppBar"
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table"

import Dropzone from "react-dropzone"

import { withStyles } from "material-ui/styles"

const styles = theme => ({
	main: {
    margin: "0 auto",
    marginTop: 70,
    width: "100%",
  },
  mainPaper: {
    padding: 20
  },
  monzaTable: {
    textAlign: "center"
  }
})

class Main extends Component {

  state = { value: 0 }

  handleChange = (event, value) => this.setState({ value })

  handleDrop = (acceptedFiles, rejectedFiles) => {
    const reader = new FileReader()
    reader.addEventListener("loadend", event => { 
      const json = JSON.parse(event.target.result)
      this.props.update(json)
    })

    acceptedFiles.map(file => {
      if (file.type === "application/json") {
        reader.readAsText(file)
      }
      return true
    })
  }

  renderAPs = aps => {
    const {classes} = this.props
    // channel, common name, mac, first seen, key, ssid
    return (
      <Table className={classes.monzaTable}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.monzaTable}>SSID</TableCell>
            <TableCell numeric className={classes.monzaTable}>MAC Address</TableCell>
            <TableCell numeric className={classes.monzaTable}>Channel</TableCell>
            <TableCell numeric className={classes.monzaTable}>Position</TableCell>
            <TableCell numeric className={classes.monzaTable}>Last Seen</TableCell>
            <TableCell numeric className={classes.monzaTable}>Clients</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aps.map(n => {
            return (
              <TableRow key={n["Key"]}>
                <TableCell className={classes.monzaTable}>{n["SSID"]}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["Device MAC"]}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["Channel"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Latitude"] + ", " + n["Longitude"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Last Seen"]}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["Clients"].length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }

  renderClients = clients => {
    const {classes} = this.props
    return (
      <Table className={classes.monzaTable}>
        <TableHead>
          <TableRow>
            <TableCell numeric className={classes.monzaTable}>MAC Address</TableCell>
            <TableCell numeric className={classes.monzaTable}>Position</TableCell>
            <TableCell numeric className={classes.monzaTable}>Last Seen</TableCell>
            <TableCell numeric className={classes.monzaTable}>APs</TableCell>
            <TableCell numeric className={classes.monzaTable}>Probes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(n => {
            return (
              <TableRow key={n["Key"]}>
                <TableCell numeric className={classes.monzaTable}>{n["Device MAC"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Latitude"] + ", " + n["Longitude"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Last Seen"]}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["APs"].length}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["Probes"].length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }

  renderBridged = bridged => {
    const {classes} = this.props
    return (
      <Table className={classes.monzaTable}>
        <TableHead>
          <TableRow>
            <TableCell numeric className={classes.monzaTable}>MAC Address</TableCell>
            <TableCell numeric className={classes.monzaTable}>Position</TableCell>
            <TableCell numeric className={classes.monzaTable}>Last Seen</TableCell>
            <TableCell numeric className={classes.monzaTable}>APs</TableCell>
            <TableCell numeric className={classes.monzaTable}>Probes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bridged.map(n => {
            return (
              <TableRow key={n["Key"]}>
                <TableCell numeric className={classes.monzaTable}>{n["Device MAC"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Latitude"] + ", " + n["Longitude"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Last Seen"]}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["APs"].length}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["Probes"].length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }

  renderOther = other => {
    const {classes} = this.props
    return (
      <Table className={classes.monzaTable}>
        <TableHead>
          <TableRow>
            <TableCell numeric className={classes.monzaTable}>MAC Address</TableCell>
            <TableCell numeric className={classes.monzaTable}>Position</TableCell>
            <TableCell numeric className={classes.monzaTable}>Last Seen</TableCell>
            <TableCell numeric className={classes.monzaTable}>APs</TableCell>
            <TableCell numeric className={classes.monzaTable}>Probes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {other.map(n => {
            return (
              <TableRow key={n["Key"]}>
                <TableCell numeric className={classes.monzaTable}>{n["Device MAC"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Latitude"] + ", " + n["Longitude"]}</TableCell>
                <TableCell className={classes.monzaTable}>{n["Last Seen"]}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["APs"].length}</TableCell>
                <TableCell numeric className={classes.monzaTable}>{n["Probes"].length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
  
  renderTabs = () => {
    const { value } = this.state
    const { datafile } = this.props
    const { aps, clients, bridged, other, probes } = datafile
    if (aps.length || clients.length || bridged.length || other.length || probes.length) {
      return (
        <div>
          <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="APs" />
            <Tab label="Clients" />
            <Tab label="Bridged" />
            <Tab label="Other" />
          </Tabs>
          </AppBar>
          <div>
            { value === 0 && this.renderAPs(aps) }
            { value === 1 && this.renderClients(clients) }
            { value === 2 && this.renderBridged(bridged) }
            { value === 3 && this.renderOther(other) }
          </div>
        </div>
      )
    }
    return null
  }

  render = () => {
    const { classes } = this.props
    return (
      <Grid container spacing={16} className={classes.main}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={classes.mainPaper}>
            <Typography variant="headline"> Welcome to Monza</Typography>
            <Divider style={{marginBottom: 10}}/>
            <Dropzone onDrop={this.handleDrop} style={{padding: 5, backgroundColor: "#eee", position: "relative", border: "1px solid #ddd", height: 30, textAlign: "center", color: "#aaa", borderRadius: 10}}>
              <Typography style={{color: "inherit"}}variant="body1">Drop files here or click to upload!</Typography>
            </Dropzone>
            { this.renderTabs() }

          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapState = state => {
  const datafile = state.datafile
  return { datafile }
}
// Map the toggle method from the Status model in src/models/status.js to this.props.toggleStim
const mapDispatch = dispatch => ({ 
    update: (payload) => dispatch.datafile.update(payload),
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Main))