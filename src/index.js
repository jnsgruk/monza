import "typeface-roboto"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { init } from "@rematch/core"
import * as models from "./models/models"

import App from "./app"
import Wrapper from "./components/general/Wrapper"

// Initialize the redux store using Rematch/init
const store = init({ models })

// Render the application using the above created Store
// Wrapper is a custom component that allows us to switch between light/dark theme
ReactDOM.render(
  <Provider store={store}>
   <Wrapper>
     <App/>
   </Wrapper>
  </Provider>,
  document.getElementById("root")
)
