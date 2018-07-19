import React, { Component } from "react"

import DataTable from "./datatable"

const columns = [{ name: "probe", title: "SSID Probe" }]

class ProbeTable extends Component {
  generateRows = rows => rows.map(b => ({ probe: b }))

  render = () => {
    const { rows } = this.props
    const tableRows = this.generateRows(rows)
    return <DataTable display={10} rows={tableRows} columns={columns} />
  }
}

export default ProbeTable
