import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import PropTypes from 'prop-types';
// This is a wrapper to enable theme switching between light/dark
class Wrapper extends Component {
  
  static childContextTypes = {
    changeTheme: PropTypes.func
  }

  constructor(props) {
    super(props)
    const theme = createMuiTheme({ palette: { type: "light" } })
    this.state = { toggle: true, theme: theme }
  }
  // Update state and recompile theme to be light/dark respectively
  changeTheme = () => {
    const theme = createMuiTheme(this.getNextTheme())
    const toggle = !this.state.toggle
    this.setState({ theme: theme, toggle: toggle })
  }
  // Work out which theme to switch to next
  getNextTheme = () => {
    const next = this.state.toggle ? "dark" : "light" 
    return { palette: { type: next } }
  }
  // Provider for children to getContext
  getChildContext = () => {
    return { changeTheme: this.changeTheme }
  }
  // Render a MUIThemeProvider with this component's children inside
  render = () => {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

export default Wrapper
