import React, { Component } from "react"

import Tabs, { Tab } from "material-ui/Tabs"
import AppBar from "material-ui/AppBar"

import ClientTable from "./ClientTable"
import APTable from "./APTable"
import OtherTable from "./OtherTable"
import BridgedTable from "./BridgedTable"

class TableTabs extends Component {

    state = { value: 0 }

    handleChange = (event, value) => this.setState({ value })
    
    render = () => {
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
              <div style={{width: "100%", padding: 20, paddingTop: 0}}>
                { value === 0 && <APTable aps={aps}/> }
                { value === 1 && <ClientTable clients={clients}/> }
                { value === 2 && <BridgedTable bridged={bridged}/> }
                { value === 3 && <OtherTable other={other}/> }
              </div>
            </div>
          )
        }
        return null
    }
}

export default TableTabs
