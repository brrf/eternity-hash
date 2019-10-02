import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Collection from './Collection';
import Piece from './Piece';
import AddPiece from './AddPiece';
import Cart from './Cart';
import Checkout from './Checkout';
import FinalizePayment from './FinalizePayment';
import PurchasedItems from './PurchasedItems';
import Other from './Other';

function App(props) {
  return (
    <Router>
      <Switch>
            <Route exact path ='/' component={Home} />
            <Route path ='/authentication/login' component={Login} />
            <Route path ='/authentication/logout' component={Logout} />
            <Route path ='/authentication/register' component={Register} />
            <Route exact path = '/collection' component={Collection} />
            <Route path = '/collection/:id' component={Piece} />
            <Route path = '/addpiece' component={AddPiece} />
            <Route exact path = '/cart' component={Cart} />
            <Route path = '/cart/final' component={FinalizePayment} />
            <Route path = '/cart/:id' component={Checkout} />
            <Route path ='/purchaseditems' component={PurchasedItems} />
            <Route path= '/comingsoon' component={Other} />
      </Switch>
    </Router>
  );
}

export default connect()(App);
