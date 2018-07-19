import React, { Component } from "react"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"

import DataTable from "./Datatable"

const styles = theme => ({
  link: {
    color: "inherit"
  }
})

const columns = [
  { name: "ssid", title: "SSID" },
  { name: "mac", title: "MAC Address" },
  { name: "channel", title: "Channel" },
  { name: "clients", title: "Clients" },
  { name: "lat", title: "Latitude" },
  { name: "lon", title: "Longitude" },
  { name: "lastseen", title: "Last Seen" }
]

class APTable extends Component {

  generateRows = aps => {
    const { classes } = this.props
    return aps.map(ap => {
      return { 
        ssid: ap["SSID"], 
        mac: <Link className={classes.link} to={`/ap/${ap["Device MAC"]}`}>{ap["Device MAC"]}</Link>, 
        channel: ap["Channel"], 
        clients: ap["Clients"].length, 
        lat: ap["Latitude"], 
        lon: ap["Longitude"], 
        lastseen: ap["Last Seen"]
      }
    })
  }

  render = () => {
    const { aps } = this.props
    const rows = this.generateRows(aps)
    return <DataTable display={10} rows={rows} columns={columns}/>
  }
}

export default withStyles(styles)(APTable)