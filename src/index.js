import "typeface-roboto"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { init } from "@rematch/core"
import * as models from "./models/models"

import Monza from "./pages/monza"
import Wrapper from "./components/wrapper"

const store = init({ models })

ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <Monza />
    </Wrapper>
  </Provider>,
  document.getElementById("root")
)
