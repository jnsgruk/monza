import React, { Component } from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Dropzone from "react-dropzone"

const styles = {
  dropzone: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#eee",
    position: "relative",
    border: "1px solid #ddd",
    height: 50,
    textAlign: "center",
    color: "#aaa",
    borderRadius: 10,
  },

  dropzoneText: {
    color: "inherit",
    paddingTop: 10,
  },
  dropPaper: {
    padding: 20,
    marginBottom: 10,
  },
}

class MonzaDropzone extends Component {
  handleDrop = (acceptedFiles, rejectedFiles) => {
    const { update, history } = this.props
    const reader = new FileReader()
    reader.addEventListener("loadend", e => {
      update(JSON.parse(e.target.result))
      history.push("/aps")
    })

    acceptedFiles.map(
      f => (f.type === "application/json" ? reader.readAsText(f) : true)
    )
  }

  render = () => {
    const { classes, datafile } = this.props
    return !Object.keys(datafile).length ? (
      <Dropzone onDrop={this.handleDrop} className={classes.dropzone}>
        <Typography className={classes.dropzoneText} variant="body1">
          Drop files here or click to upload!
        </Typography>
      </Dropzone>
    ) : null
  }
}

const mapState = ({ datafile }) => ({ datafile })

const mapDispatch = ({ datafile }) => ({
  update: datafile.update,
})

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(MonzaDropzone)
)
