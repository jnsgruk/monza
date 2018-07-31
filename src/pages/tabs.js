import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

import { Tabs as MUITabs, Tab, AppBar } from "@material-ui/core"

import GenericTable from "../components/tables/generic-table"
import APTable from "../components/tables/ap-table"
import ProbeTable from "../components/tables/probe-table"

import APClientGraph from "./tabs/ap-client-graph"

const styles = {
  tabBar: {
    width: "calc(100% + 40px)",
    marginTop: -20,
    marginLeft: -20,
  },
}

class Tabs extends Component {
  render = () => {
    const { classes, datafile, match, history } = this.props
    const { path } = match
    const { aps, clients, bridged, other, probes } = datafile
    const conn = Object.keys(datafile).length
      ? [...clients, ...bridged, ...other]
      : null

    return conn ? (
      <div>
        <AppBar position="static" color="default" className={classes.tabBar}>
          <MUITabs
            value={path}
            onChange={(e, v) => history.push(v)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="/aps" label="APs" />
            <Tab value="/clients" label="Clients" />
            <Tab value="/probes" label="Probes" />
            <Tab value="/graph" label="AP/Client Graph" />
          </MUITabs>
        </AppBar>
        <div style={{ width: "100%", padding: 20, paddingTop: 0 }}>
          {path === "/aps" && <APTable aps={aps} />}
          {path === "/clients" && <GenericTable rows={conn} />}
          {path === "/probes" && <ProbeTable rows={probes} />}
          {path === "/graph" && <APClientGraph aps={aps} connected={conn} />}
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    )
  }
}

const mapState = ({ datafile }) => ({ datafile })

export default withStyles(styles)(connect(mapState)(Tabs))
