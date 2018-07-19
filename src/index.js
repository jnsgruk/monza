import "typeface-roboto"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { init } from "@rematch/core"
import * as models from "./models/models"

import Monza from "./pages/monza"
import Wrapper from "./components/wrapper"

// Initialize the redux store using Rematch/init
const store = init({ models })

// Render the application using the above created Store
// Wrapper is a custom component that allows us to switch between light/dark theme
ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <Monza />
    </Wrapper>
  </Provider>,
  document.getElementById("root")
)
