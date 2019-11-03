import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import handleLogoutuser from "../actions/logout";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/authentication/logout", {
      credentials: "include"
    })
      .then(res => res.json)
      .then(resObject => {
        if (!resObject.error) {
          this.props.dispatch(handleLogoutuser());
          this.setState({ loggedIn: false });
        }
      });
  }

  render() {
    let fname = this.props.fname ? this.props.fname : null;
    if (!this.state.loggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/authentication/login",
            state: { message: "You are logged out!" }
          }}
        />
      );
    }
    return (
      <div>
        <p>Logging out, {fname}!</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let fname;
  if (state.authedUser.authedUser) {
    fname = state.authedUser.authedUser.fname;
  }
  return { fname };
}

export default connect(mapStateToProps)(Logout);
