import React, { Component } from "react"
import { withStyles } from "material-ui/styles"

import Tabs, { Tab } from "material-ui/Tabs"
import AppBar from "material-ui/AppBar"
import Paper from "material-ui/Paper"

import APTable from "./APTable"
import GenericTable from "./GenericTable"
import ProbeTable from "./ProbeTable"

import APClientGraph from "../graphs/APClientGraph"

const styles = theme => ({
  mainPaper: { padding: 20 },
  tabBar: {
    width: "calc(100% + 40px)",
    marginTop: -20,
    marginLeft: -20
  }
})

class TableTabs extends Component {

  state = { value: 5 }

  handleChange = (event, value) => this.setState({ value })
  
  render = () => {
    const { value } = this.state
    const { classes, datafile } = this.props
    const { aps, clients, bridged, other, probes } = datafile
    if (Object.keys(datafile).length > 0) {
      return (
        <Paper className={classes.mainPaper}>
          <AppBar position="static" color="default" className={classes.tabBar}>
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
            <Tab label="Probes" />
            <Tab label="AP/Client Graph" />
          </Tabs>
          </AppBar>
          <div style={{width: "100%", padding: 20, paddingTop: 0}}>
            { value === 0 && <APTable aps={aps}/> }
            { value === 1 && <GenericTable rows={clients}/> }
            { value === 2 && <GenericTable rows={bridged}/> }
            { value === 3 && <GenericTable rows={other}/> }
            { value === 4 && <ProbeTable rows={probes}/> }
            { value === 5 && <APClientGraph aps={aps} clients={clients} bridged={bridged} other={other}/> }
          </div>
        </Paper>
      )
    }
    return null
  }
}

export default withStyles(styles)(TableTabs)
