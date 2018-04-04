import React, { Component } from "react"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import Dropzone from "react-dropzone"

import Typography from "material-ui/Typography"
import Paper from "material-ui/Paper"

const styles = theme => ({
  dropzone: {
    marginBottom: 10, 
    padding: 5, 
    backgroundColor: "#eee", 
    position: "relative", 
    border: "1px solid #ddd", 
    height: 50, 
    textAlign: "center", 
    color: "#aaa", 
    borderRadius: 10
  },

  dropzoneText: {
    color: "inherit", 
    paddingTop: 10
  },
    dropPaper: {
    padding: 20,
    marginBottom: 10
  }
})

class MonzaDropzone extends Component {

  handleDrop = (acceptedFiles, rejectedFiles) => {
    const reader = new FileReader()
    reader.addEventListener("loadend", event => { 
      const json = JSON.parse(event.target.result)
      this.props.update(json)
    })

    acceptedFiles.map(file => {
      if (file.type === "application/json") {
        reader.readAsText(file)
      }
      return true
    })
  }
    
  render = () => {
    const { classes } = this.props
    return (
      <Paper className={classes.dropPaper}>
      <Dropzone onDrop={this.handleDrop} className={classes.dropzone}>
        <Typography className={classes.dropzoneText} variant="body1">Drop files here or click to upload!</Typography>
      </Dropzone>
      </Paper>
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

export default withStyles(styles)(connect(mapState, mapDispatch)(MonzaDropzone))