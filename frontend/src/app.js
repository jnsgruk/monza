import React, { Component } from "react"

// withStyles provides a method to apply the styles specified
// It provides the component with a prop called "classes"
import { withStyles } from "material-ui/styles"

// CSS baseline basically does a CSS reset on the page
import CssBaseline from "material-ui/CssBaseline"
import Nav from "./containers/general/Nav"
import Main from "./components/Main"

const styles = theme => ({
  root: {
    flex: 1
  }
})
class App extends Component {
  render = () => {
    const { classes } = this.props
    return (
      <div>
        <CssBaseline />
        <Nav />
        <div className={classes.root}>
          <Main />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)