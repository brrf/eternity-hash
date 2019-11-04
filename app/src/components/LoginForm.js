import React, {useState} from "react";
import { connect } from "react-redux";
import Warning from "./Warning";

import handleLoginuser from "../actions/login";
import "../authenticate.css";

function LoginForm (props) {

  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [errors, updateErrors] = useState([]);

  function handleSubmit (e) {
    e.preventDefault();
    
    if (!email || !password) {
      updateErrors(["Please fill out all fields"])
      return;
    }
    fetch("http://localhost:5000/authentication/login", {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000"
      },
      mode: "cors",
      credentials: "include"
    })
      .then(res => res.json())
      .then(resObject => {
        if (resObject.errors) {
          console.log("errors");
        } else {
          props.dispatch(handleLoginuser(resObject.user));
          props.success();
        }
      });
  };
  return (
    <React.Fragment>
      <Warning errors={errors} />
      {props.authedUser ? (
        <div>Logged in as {props.authedUser}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-section">
            <label className="input-label">E-mail: </label>
            <br></br>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
            />
            <br></br>
          </div>
          <div className="input-section">
            <label className="input-label">Password:</label>
            <br></br>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
            />
            <br></br>
          </div>
          <input className="submit-button" type="submit" />
        </form>
      )}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  let authedUser = state.authedUser.authedUser
    ? state.authedUser.authedUser.fname
    : null;
  return { authedUser };
}

export default connect(mapStateToProps)(LoginForm);
