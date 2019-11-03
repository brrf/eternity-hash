import React from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import ScheduleHashForm from "./ScheduleHashForm";
import PayHash from "./PayHash";
import { setHash } from "../actions/hash";
import { connect } from "react-redux";

class scheduleHash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hashId: null
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect = hashObject => {
    this.props.dispatch(setHash(hashObject));
    this.setState({
      hashId: hashObject._id
    });
  };

  render() {
    if (this.state.hashId) {
      return <Redirect to={{ pathname: `/hashes/${this.state.hashId}` }} />;
    }
    return (
      <div>
        <Navbar />
        <ScheduleHashForm redirect={this.redirect} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {};
}

export default connect(mapStateToProps)(scheduleHash);
