import React, { Component } from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import PropTypes from "prop-types"
// This is a wrapper to enable theme switching between light/dark
class Wrapper extends Component {
  static childContextTypes = {
    changeTheme: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      toggle: true,
      theme: createMuiTheme({ palette: { type: "light" } }),
    }
  }
  // Update state and recompile theme to be light/dark respectively
  changeTheme = () => {
    this.setState({
      theme: createMuiTheme(this.getNextTheme()),
      toggle: !this.state.toggle,
    })
  }
  // Work out which theme to switch to next
  getNextTheme = () => ({
    palette: { type: this.state.toggle ? "dark" : "light" },
  })

  // Provider for children to getContext
  getChildContext = () => ({ changeTheme: this.changeTheme })

  // Render a MUIThemeProvider with this component's children inside
  render = () => (
    <MuiThemeProvider theme={this.state.theme}>
      {this.props.children}
    </MuiThemeProvider>
  )
}

export default Wrapper
