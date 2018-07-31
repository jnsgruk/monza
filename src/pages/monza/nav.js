import React, { Component } from "react"
import PropTypes from "prop-types"

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core"

import { Polymer, LightbulbOutline } from "@material-ui/icons"

class Nav extends Component {
  render = () => (
    <AppBar position="fixed">
      <Toolbar>
        <Polymer color="inherit" style={{ marginRight: 10 }} />
        <Typography color="inherit" type="title">
          Monza
        </Typography>
        <div style={{ flex: 1 }} />
        <IconButton
          color="inherit"
          label="Toggle Light/Dark"
          onClick={() => this.context.changeTheme()}
        >
          <LightbulbOutline />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Nav.contextTypes = {
  changeTheme: PropTypes.func,
}

export default Nav
