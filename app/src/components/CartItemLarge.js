import React from "react";
import { connect } from "react-redux";
import { receiveCart } from "../actions/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import formatDate from "../utils/formatDate";

class CartItemLarge extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem = itemId => {
    fetch("http://localhost:5000/cart", {
      method: "DELETE",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000"
      },
      mode: "cors",
      credentials: "include"
    })
      .then(res => res.json())
      .then(resObject => {
        if (resObject.error) {
          console.log(resObject.error);
        } else {
          fetch("http://localhost:5000/cart", {
            method: "GET",
            mode: "cors",
            credentials: "include"
          })
            .then(res => res.json())
            .then(resObject => {
              this.props.dispatch(receiveCart(resObject.cart));
            });
        }
      });
  };

  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <div className="cart-piece">
          <div className="cart-item-image-container">
            <img
              className="piece-image-large"
              src={require(`../../public/pieces-images/${
                item.piece.thumbnails[0]
              }`)}
              alt="piece"
            />
          </div>
          <div className="cart-details-container">
            <div className="cart-piece-details-container">
              <div className="cart-piece-details">
                <div className="cart-piece-title">{item.piece.title}</div>
                <div>
                  By{" "}
                  <span className="cart-piece-artist">{item.piece.artist}</span>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="1x"
                className="cart-action"
                onClick={() => this.deleteItem(item.itemId)}
              />
            </div>
            <hr />
            <div className="cart-item-details-container">
              <div className="cart-item-message">Message: {item.message}</div>
              <div className="cart-item-bottom">
                <div className="cart-item-date">
                  Date: {formatDate(item.date)}
                </div>
                <div className="cart-piece-price value">
                  ${item.piece.price}
                  <span className="cart-piece-price currency">USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default connect()(CartItemLarge);
