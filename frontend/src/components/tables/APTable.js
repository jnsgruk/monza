import React, { Component } from "react"
import { Link } from "react-router-dom"
import DataTable from "./Datatable"

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
    return aps.map(ap => {
      return { 
        ssid: ap["SSID"], 
        mac: <Link to={`/ap/${ap["Device MAC"]}`}>{ap["Device MAC"]}</Link>, 
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

export default APTable