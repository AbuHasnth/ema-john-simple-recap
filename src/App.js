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

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1> email {loggedInUser.email}</h1>
      <Header></Header>
      <Router>
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
          <Route path='/shipment'>
             <Shipment></Shipment>
          </Route>
          
          <Route path="/product/:productKey">
             <ProductDetails></ProductDetails>
          </Route>
        </Switch>
      </Router>
      
      
      
    </UserContext.Provider>
  );
}

export default App;
