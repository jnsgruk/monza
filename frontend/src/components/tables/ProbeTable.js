import React, { Component } from "react"

import DataTable from "./Datatable"

const columns = [
  { name: "probe", title: "SSID Probe" },
]

class ProbeTable extends Component {

  generateRows = rows => rows.map(b => ({probe: b}))

  render = () => {
    const { rows } = this.props
    const tableRows = this.generateRows(rows)
    return <DataTable rows={tableRows} columns={columns}/>
  }
}

export default ProbeTable