import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Auth from "./pages/Auth";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={Auth} />
          <Route path="/cours" component={null} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
