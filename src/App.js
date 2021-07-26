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


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path='/shop'>
             <Shop></Shop>
          </Route>
          <Route path='/order-review'>
             <OrderRw></OrderRw>
          </Route>
          
          <Route path="/product/:productKey">
             <ProductDetails></ProductDetails>
          </Route>
        </Switch>
      </Router>
      
      
      
    </div>
  );
}

export default App;
