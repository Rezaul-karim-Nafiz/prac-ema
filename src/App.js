import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

  export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value= {[loggedInUser, setLoggedInUser]}>
      <h3>{loggedInUser.email}</h3>
      <img style={{borderRadius: '50%'}} src={loggedInUser.photo} alt="" />
      <Header />
      <Router>  
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <PrivetRoute path="/inventory">
            <Inventory />
          </PrivetRoute>
          <Route path="/login">
            <LogIn/>
          </Route>
          <PrivetRoute path="/shipment">
            <Shipment/>
          </PrivetRoute>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
