import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderRw from './Components/OrderReview/OrderRw';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Inventory from './Components/Shipment/Inventory/Inventory';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1> email {loggedInUser.email}</h1>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path='/shop'>
             <Shop></Shop>
          </Route>
          <Route path='/order-review'>
             <OrderRw></OrderRw>
          </Route>
          <Route path='/login'>
             <Login></Login>
          </Route>
          <PrivateRoute path='/shipment'>
             <Shipment></Shipment>
          </PrivateRoute>
          <PrivateRoute path='/manage-inventory'>
             <Inventory></Inventory>
          </PrivateRoute>
          
          <Route path="/product/:productKey">
             <ProductDetails></ProductDetails>
          </Route>
        </Switch>
      </Router>
      
      
      
    </UserContext.Provider>
  );
}

export default App;
