import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import receiveCollection from "../actions/collection";
import { Link } from "react-router-dom";
import "../collection.css";

class Collection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('/white_wall.png')";
    fetch("http://localhost:5000/collection", {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(resObject => {
        this.props.dispatch(receiveCollection(resObject.collection));
        this.setState({
          loading: false
        });
      });
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = "";
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <div className="collection-container">
            {this.props.collection.map(piece => {
              return (
                <Link
                  to={`/collection/${piece._id}`}
                  className="piece"
                  key={piece._id}
                >
                  <img
                    className="piece-image"
                    src={require(`../../public/pieces-images/${
                      piece.thumbnails[0]
                    }`)}
                    alt="piece"
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    collection: state.collection.collection
  };
}

export default connect(mapStateToProps)(Collection);
