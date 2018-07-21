import React, { Component } from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"

// withStyles provides a method to apply the styles specified
// It provides the component with a prop called "classes"
import { withStyles } from "@material-ui/core/styles"

import CssBaseline from "@material-ui/core/CssBaseline"
import Nav from "./monza/nav"
import Main from "./main"
import AP from "./ap"
import Client from "./client"

const styles = theme => ({
  root: {
    flex: 1,
  },
})
class App extends Component {
  render = () => {
    const { classes } = this.props
    return (
      <div>
        <CssBaseline />
        <Nav />
        <div className={classes.root}>
          <Router>
            <div>
              <Route exact path="/" component={Main} />
              <Route name="ap" path="/ap/:mac" component={AP} />
              <Route name="client" path="/client/:mac" component={Client} />
            </div>
          </Router>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)