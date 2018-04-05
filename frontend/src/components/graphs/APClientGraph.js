import React, { Component } from "react"
import ReactDOM from "react-dom"

import { withStyles } from "material-ui/styles"

import { Graph } from "react-d3-graph"

const styles = theme => ({
  graph: {
    width: "100%",
    height: "70vh"
  }
})

class APClientGraph extends Component {

  constructor(props) {
    super(props)
    this.graphContainer = React.createRef()
  }

  state = {
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

  componentWillMount = () => {
    const { aps, clients } = this.props
    const clientsSimple = clients.map(c => ({
      id: c["Key"], 
      name: c["Device MAC"],
      symbolType: "triangle"
    }))

    const apsSimple = aps.map(c => ({
      id: c["Key"],
      name: `${c["SSID"]}\n(${c["Device MAC"]})`,
      color: "black"
    }))

    const links = Array.prototype.concat.apply([], clients.map(c => {
      return c["APs"].map(ap => ({ source: c["Key"], target: ap["Key"] }))
    }))
    
    this.setState({
      data: {
        nodes: clientsSimple.concat(apsSimple),
        links
      }
    })
  }

  componentDidMount = () => {
    this.updateGraphSize()
    window.addEventListener("resize", this.updateGraphSize)
  }

  componentWillUnmount = () => window.removeEventListener("resize", this.updateGraphSize)
  

  render = () => {
    const { classes } = this.props
    const { data, graphConfig } = this.state

    return (
      <div id="graphContainer" ref={ this.graphContainer } className={classes.graph}>
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