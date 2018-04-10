import React, { Component } from "react"

import { withStyles } from "material-ui/styles"

import { Graph } from "react-d3-graph"
import Checkbox from "material-ui/Checkbox"
import { FormGroup, FormControlLabel } from "material-ui/Form"

const styles = theme => ({
  graph: {
    width: "100%",
    height: "70vh"
  }
})

class APClientGraph extends Component {
  state = {
    showNullLinks: false,
    aggregateBySSID: true,
    data: { nodes: [], links: [] },
    graphConfig: {
      nodeHighlightBehavior: true,
      staticGraph: false,
      automaticRearrangeAfterDropNode: true,
      node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue',
        labelProperty: "name"
      },
      link: {
        highlightColor: 'lightblue'
      }
    }
  }

  updateGraphSize = () => {
    const container = document.getElementById("graphContainer")
    this.setState(state => ({
      graphConfig: {
        ...state.graphConfig,
        width: container.offsetWidth,
        height: container.offsetHeight
      }
    }))
  }

  formatData = (aggregate, nullLinks) => {
    const { aps, connected } = this.props
    let clientsSimple, apsSimple, links

    let allClients = connected
    let filteredAPs = !nullLinks ? aps.filter(ap => ap["Clients"].length > 0) : aps
    let filteredClients = !nullLinks ? allClients.filter(client => client["APs"].length > 0) : allClients
    
    clientsSimple = filteredClients.map(c => ({
      id: c["Key"], 
      name: c["Device MAC"],
      symbolType: "triangle"
    }))

    if (aggregate) {
      // Filter APs to only include one entry per SSID
      const aggregatedAPs = filteredAPs.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj["SSID"]).indexOf(obj["SSID"]) === pos;
      })
      // Create node list
      apsSimple = aggregatedAPs.map(c => ({
        id: c["SSID"],
        name: `${c["SSID"]}`,
        color: "black"
      }))
      // Populate links
      links = Array.prototype.concat.apply([], filteredClients.map(c => {
        return c["APs"].map(ap => {
          // Find the SSID associated with the MAC address in the client object
          let ssid = filteredAPs.filter(a => ap["BSSID"] === a["Device MAC"])
          return ssid[0] ? { source: c["Key"], target: ssid[0]["SSID"]  } : null
        })
      })).filter(l => l !== null)

    }
    else {
      apsSimple = filteredAPs.map(c => ({
        id: c["Key"],
        name: `${c["SSID"]}\n(${c["Device MAC"]})`,
        color: "black"
      }))
      links = Array.prototype.concat.apply([], filteredClients.map(c => {
        return c["APs"].map(ap => {
          let matched = filteredAPs.filter(a => a["Key"] === ap["Key"])
          return matched[0] ? { source: c["Key"], target: ap["Key"] } : null
        })
      })).filter(l => l !== null)
    }
    
    this.setState(state => ({
      ...state,
      data: {
        nodes: clientsSimple.concat(apsSimple),
        links
      }    
    }))
  }

  componentWillMount = () => this.formatData(this.state.aggregateBySSID)
  componentWillUnmount = () => window.removeEventListener("resize", this.updateGraphSize)

  componentDidMount = () => {
    this.updateGraphSize()
    window.addEventListener("resize", this.updateGraphSize)
  }

  handleAggregate = () => {
    const aggregate = !this.state.aggregateBySSID
    this.setState({aggregateBySSID: aggregate })
    this.formatData(aggregate, this.state.showNullLinks)
  }

  handleNullLinks = () => {
    const nullLinks = !this.state.showNullLinks
    this.setState({showNullLinks: nullLinks })
    this.formatData(this.state.aggregateBySSID, nullLinks)
  }

  render = () => {
    const { classes } = this.props
    const { data, graphConfig, aggregateBySSID, showNullLinks } = this.state
    return (
      <div id="graphContainer" className={classes.graph}>
        <FormGroup row>
          <FormControlLabel
            control= {
              <Checkbox checked={aggregateBySSID} onChange={() => this.handleAggregate()} color="primary"/>
            }
            label="Aggregate by SSID Name"
          />
          <FormControlLabel
            control= {
              <Checkbox checked={showNullLinks} onChange={() => this.handleNullLinks()} color="primary"/>
            }
            label="Draw null links"
          />
        </FormGroup>
        <Graph
          id="ap_client_graph"
          data = { data }
          config = { graphConfig }
        />
      </div>
    )
  }
}

export default withStyles(styles)(APClientGraph)