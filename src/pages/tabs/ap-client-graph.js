import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

import { Graph } from "react-d3-graph"
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core"

const styles = {
  graph: {
    width: "100%",
    height: "calc(100vh - 180px)",
  },
}

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
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
        labelProperty: "name",
      },
      link: {
        highlightColor: "lightblue",
      },
    },
  }

  updateGraphSize = () => {
    const container = document.getElementById("graphContainer")
    this.setState(state => ({
      graphConfig: {
        ...state.graphConfig,
        width: container.offsetWidth - 10,
        height: container.offsetHeight - 10,
      },
    }))
  }

  formatData = (aggregate, nullLinks) => {
    const { aps, connected } = this.props
    let clientsSimple, apsSimple, links

    let filteredAPs = !nullLinks
      ? aps.filter(ap => ap["Clients"].length > 0)
      : aps
    let filteredClients = !nullLinks
      ? connected.filter(client => client["APs"].length > 0)
      : connected

    clientsSimple = filteredClients.map(c => ({
      id: c["Key"],
      name: c["Device MAC"],
      symbolType: "triangle",
    }))

    if (aggregate) {
      // Filter APs to only include one entry per SSID
      const aggregatedAPs = filteredAPs.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj["SSID"]).indexOf(obj["SSID"]) === pos
      })
      // Create node list
      apsSimple = aggregatedAPs.map(c => ({
        id: c["SSID"],
        name: `${c["SSID"]}`,
        color: "black",
      }))

      links = filteredClients.reduce((links, c) => {
        // For each of the APs associated with the client
        const clientLinks = c["APs"].reduce((cLinks, ap) => {
          // Lookup the SSID for the AP
          const match = filteredAPs.filter(a => ap["BSSID"] === a["Device MAC"])
          const ssid = match[0] ? match[0].SSID : null
          // If an SSID was found, and a link hasn't already been made to that SSID
          if (ssid && !cLinks.filter(l => l.target === ssid).length) {
            return [...cLinks, { source: c["Key"], target: ssid }]
          }
          return cLinks
        }, [])
        return [...links, ...clientLinks]
      }, [])
    } else {
      apsSimple = filteredAPs.map(c => ({
        id: c["Key"],
        name: `${c["SSID"]}\n(${c["Device MAC"]})`,
        color: "black",
      }))

      links = filteredClients.reduce((links, c) => {
        const clientLinks = c["APs"].reduce((cLinks, ap) => {
          let matched = filteredAPs.filter(a => a["Key"] === ap["Key"])
          if (matched[0]) {
            return [...cLinks, { source: c["Key"], target: ap["Key"] }]
          }
          return cLinks
        }, [])
        return [...links, ...clientLinks]
      }, [])
    }
    this.setState(state => ({
      ...state,
      data: {
        nodes: [...clientsSimple, ...apsSimple],
        links,
      },
    }))
  }

  componentWillMount = () => this.formatData(this.state.aggregateBySSID)
  componentWillUnmount = () =>
    window.removeEventListener("resize", this.updateGraphSize)

  componentDidMount = () => {
    this.updateGraphSize()
    window.addEventListener("resize", this.updateGraphSize)
  }

  handleAggregate = () => {
    const aggregate = !this.state.aggregateBySSID
    this.setState({ aggregateBySSID: aggregate })
    this.formatData(aggregate, this.state.showNullLinks)
  }

  handleNullLinks = () => {
    const nullLinks = !this.state.showNullLinks
    this.setState({ showNullLinks: nullLinks })
    this.formatData(this.state.aggregateBySSID, nullLinks)
  }

  onClickNode = (source, target) => {
    const { aps, connected } = this.props
    const nodes = [...aps, ...connected]
    const match = nodes.filter(n => n["Key"] === source)
    if (match.length > 0) {
      const type = match[0]["Type"]
      if (type === "Wi-Fi AP") {
        this.props.history.push(`/ap/${match[0]["Device MAC"]}`)
      } else {
        this.props.history.push(`/client/${match[0]["Device MAC"]}`)
      }
    }
  }

  render = () => {
    const { classes } = this.props
    const { data, graphConfig, aggregateBySSID, showNullLinks } = this.state
    return (
      <div id="graphContainer" className={classes.graph}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={aggregateBySSID}
                onChange={() => this.handleAggregate()}
                color="primary"
              />
            }
            label="Aggregate by SSID Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showNullLinks}
                onChange={() => this.handleNullLinks()}
                color="primary"
              />
            }
            label="Draw null links"
          />
        </FormGroup>
        <Graph
          id="ap_client_graph"
          data={data}
          config={graphConfig}
          onClickNode={this.onClickNode}
        />
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(APClientGraph))
