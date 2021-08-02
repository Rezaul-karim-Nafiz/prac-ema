import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
  export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value= {[loggedInUser, setLoggedInUser]}>
      <h3>{loggedInUser.email}</h3>
      <img style={{borderRadius: '50%'}} src={loggedInUser.photo} alt="" />
      <Header />
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
      
    </UserContext.Provider>
  );
}

export default App;
