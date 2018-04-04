import React, { Component } from "react"
import { connect } from "react-redux"

import Grid from "material-ui/Grid"
import Paper from "material-ui/Paper"

import TableTabs from "../components/tables/TableTabs"
import MonzaDropzone from "./dropzone/MonzaDropzone"

import { withStyles } from "material-ui/styles"

const styles = theme => ({
	main: {
    margin: "0 auto",
    marginTop: 70,
    width: "100%",
  },
  mainPaper: {
    padding: 20
  }
})

class Main extends Component {
  render = () => {
    const { classes, datafile } = this.props
    return (
      <Grid container spacing={16} className={classes.main}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={classes.mainPaper}>
            <MonzaDropzone />
            <TableTabs datafile={datafile}/>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapState = state => {
  const datafile = state.datafile
  return { datafile }
}

const mapDispatch = dispatch => ({ 
    update: (payload) => dispatch.datafile.update(payload),
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Main))