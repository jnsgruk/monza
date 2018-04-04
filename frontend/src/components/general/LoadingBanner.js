import React from "react"

import { CircularProgress } from "material-ui/Progress"

const LoadingBanner = props => {
  return (
    <div style={{textAlign: "center", paddingTop: 20}}>
      <CircularProgress size={50} />
    </div>
  )
}

export default LoadingBanner