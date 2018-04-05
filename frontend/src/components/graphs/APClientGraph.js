import React, { Component } from "react"

import { withStyles } from "material-ui/styles"

import { Graph } from "react-d3-graph"

const styles = theme => ({
  graph: {
    width: "100%",
    height: 500,
  },

  "graph > svg": {
    width: "100%"
  }
})

class APClientGraph extends Component {

  render = () => {
    const { classes, aps, clients } = this.props

    const data = {
      nodes: [],
      links: []
    }

    const myConfig = {
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

    const clientsSimple = clients.map(c => ({
      id: c["Key"], 
      name: c["Device MAC"],
      symbolType: "triangle"
    }))

    const apsSimple = aps.map(c => ({
      id: c["Key"],
      name: c["SSID"],
      color: "black"
    }))

    const links = Array.prototype.concat.apply([], clients.map(c => {
      return c["APs"].map(ap => {
        return {source: c["Key"], target: ap["Key"]}
      })
    }))
    


    data.nodes.push(...clientsSimple)
    data.nodes.push(...apsSimple)

    data.links.push(...links)

    return (
      <div id="graphContainer" className={classes.graph}>
        <Graph
          id="ap_client_graph"
          data = { data }
          config = { myConfig }
        />
      </div>
    )
  }
}

export default withStyles(styles)(APClientGraph)