import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { withStyles } from "material-ui/styles"

import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import Typography from "material-ui/Typography"
import Polymer from "material-ui-icons/Polymer"
import LightbulbOutline from "material-ui-icons/LightbulbOutline"

const styles = theme => ({
  nav: {
    width: "100%",
    padding: 0
  }
})


class Nav extends Component {

  render = () => {
    const { classes } = this.props
    return (
      <div className={classes.nav}>
        <AppBar position="fixed">
          <Toolbar>
            <Polymer color="inherit" style={{ marginRight: 10 }} />
            <Typography color="inherit" type="title">Monza</Typography>
            <div style={{flex: 1}}></div>
            <IconButton color="inherit" label="Toggle Light/Dark" onClick={ () => this.context.changeTheme() }>
              <LightbulbOutline/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Nav.contextTypes = {
  changeTheme: PropTypes.func
}

// Map the status object into this.props
const mapState = state => {
  const status = state.status
  return { status }
}

Nav = withStyles(styles)(Nav)
export default connect(mapState)(Nav)

