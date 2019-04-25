import React, { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    const body = {
      query: `
        query {
          login(email:"${email}",password:"${password}"){
            userId
          }
        }
      `
    };
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resbody => {
        console.log(resbody);
      });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className="content-el">
          <label htmlFor="email">Email</label>
          <input type="email" ref={this.emailEl} />
          <label htmlFor="password">Password</label>
          <input type="password" ref={this.passEl} />
        </div>
        <div className="action-el">
          <button type="button" value="signup">
            signup
          </button>
          <button type="submit" value="signin">
            signin
          </button>
        </div>
      </form>
    );
  }
}
export default Auth;
