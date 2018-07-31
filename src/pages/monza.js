import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import { Grid, Paper, CssBaseline } from "@material-ui/core"

import Nav from "./monza/nav"
import Dropzone from "./dropzone"
import Tabs from "./tabs"
import AP from "./ap"
import Client from "./client"

const styles = {
  main: {
    margin: "0 auto",
    marginTop: 70,
    width: "100%",
    fontFamily: "Roboto !important",
  },
  mainPaper: {
    padding: 20,
  },
}

const Monza = ({ classes }) => (
  <div>
    <CssBaseline />
    <Nav />
    <div>
      <Router>
        <Grid container spacing={16} className={classes.main}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper className={classes.mainPaper}>
              <Route exact path="/" component={Dropzone} />
              <Route exact path="/aps" component={Tabs} />
              <Route exact path="/clients" component={Tabs} />
              <Route exact path="/probes" component={Tabs} />
              <Route exact path="/graph" component={Tabs} />
              <Route name="ap" path="/ap/:mac" component={AP} />
              <Route name="client" path="/client/:mac" component={Client} />
            </Paper>
          </Grid>
        </Grid>
      </Router>
    </div>
  </div>
)

export default withStyles(styles)(Monza)
