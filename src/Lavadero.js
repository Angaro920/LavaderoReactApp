import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from "./components/Login"
import Search from "./components/Search"
import FormRegistro from "./components/FormRegistro"
import RegistroAuto from "./components/RegistroAuto"

import "./styles/styles.css"

const Lavadero = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/formRegistro" component={FormRegistro} />
        <Route exact path="/registroAuto" component={RegistroAuto} />
      </Switch>
    </BrowserRouter>
  )
}

export default Lavadero;
