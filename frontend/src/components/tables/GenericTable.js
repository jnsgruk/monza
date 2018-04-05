import React, { Component } from "react"

import DataTable from "./Datatable"

const columns = [
  { name: "mac", title: "MAC Address" },
  { name: "aps", title: "APs" },
  { name: "probes", title: "Probes" },
  { name: "lat", title: "Latitude" },
  { name: "lon", title: "Longitude" },
  { name: "lastseen", title: "Last Seen" }
]

class GenericTable extends Component {

  generateRows = rows => {
    return rows.map(b => {
      return { 
        mac: b["Device MAC"], 
        lat: b["Latitude"], 
        lon: b["Longitude"], 
        probes: b["Probes"].length, 
        aps: b["APs"].length, 
        lastseen: b["Last Seen"]
      }
    })
  }

  render = () => {
    const { rows } = this.props
    const tableRows = this.generateRows(rows)
    return <DataTable rows={tableRows} columns={columns}/>
  }
}

export default GenericTable