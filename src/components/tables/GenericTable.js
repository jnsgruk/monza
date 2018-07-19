import React, { Component } from "react"
import Typography from "@material-ui/core/Typography"
import DataTable from "./Datatable"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  link: {
    color: "inherit",
  },
})

const columns = [
  { name: "mac", title: "MAC Address" },
  { name: "aps", title: "APs" },
  { name: "probes", title: "Probes" },
  { name: "lat", title: "Latitude" },
  { name: "lon", title: "Longitude" },
  { name: "lastseen", title: "Last Seen" },
]

class GenericTable extends Component {
  generateRows = rows => {
    const { classes } = this.props
    return rows.map(b => {
      return {
        mac: (
          <Link className={classes.link} to={`/client/${b["Device MAC"]}`}>
            {b["Device MAC"]}
          </Link>
        ),
        lat: b["Latitude"],
        lon: b["Longitude"],
        probes: b["Probes"].length,
        aps: b["APs"].length,
        lastseen: b["Last Seen"],
      }
    })
  }

  render = () => {
    const { rows, display } = this.props
    const tableRows = this.generateRows(rows)
    if (rows.length > 0) {
      return (
        <DataTable
          display={display ? display : 10}
          rows={tableRows}
          columns={columns}
        />
      )
    }
    return <Typography>No devices to show!</Typography>
  }
}

export default withStyles(styles)(GenericTable)
