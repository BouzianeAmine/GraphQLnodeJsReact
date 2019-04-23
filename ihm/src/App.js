import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import NavBar from "./components/Navigation/MainNav";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <main>
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={Auth} />
              <Route path="/cours" component={Courses} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
