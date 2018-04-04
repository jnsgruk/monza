import React, { Component } from "react"

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
    let rows = []
    for (let ap of aps) {
      rows.push({ 
        ssid: ap["SSID"], 
        mac: ap["Device MAC"], 
        channel: ap["Channel"], 
        clients: ap["Clients"].length, 
        lat: ap["Latitude"], 
        lon: ap["Longitude"], 
        lastseen: ap["Last Seen"]
      })
    }
    return rows
  }

  render = () => {
    const { aps } = this.props
    const rows = this.generateRows(aps)
    return <DataTable rows={rows} columns={columns}/>
  }
}

export default APTable