import React from "react";

export default class Warning extends React.Component {
  render() {
    return (
      <ul className="error-list">
        {this.props.errors.map(error => {
          return (
            <li className="flash error" key={error}>
              {error}
            </li>
          );
        })}
      </ul>
    );
  }
}
