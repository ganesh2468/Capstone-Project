import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth-service";

import Login from "./Components/Login";
import Home from "./Components/Home";
import DisplayBook from "./Components/DisplayBook";
import DisplayBookuser from "./Components/DisplayBookuser";
import Addbook from "./Components/Addbook";
import Viewbook from "./Components/Viewbook";
import Borrowbook from "./Components/Borrowbook";
import Register from "./Components/Register";
import logo from "./Services/logo.png";
import logout from "./logout.png";
import Request from "./Components/Request";
import cart from "./cart.jfif";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import BuyRequest from "./Components/BuyRequest";
import Updatebook from "./Components/Updatebook";
import Protected from "./Components/Protected";
const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [getUserBoard, setUserBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setUserBoard(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light" style={{"backgroundColor":"orange","fontWeight":"bold"}}>
        <Link to={"/"} className="navbar-brand">
        <img src={logo} style={{"height":"40px","width":"100px","paddingLeft":"10px"}}/>
        </Link>
        <div className="navbar-nav mr-auto">
          {getUserBoard && (
            <li className="nav-item">
              <Link to={"/Displaybookuser"} className="nav-link">
                DisplayBook
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/addbook"} className="nav-link">
                Add Book
              </Link>
            </li>
          )} 

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/displayBook"} className="nav-link">
                Update Book
              </Link>
            </li>
          )}

          {showAdminBoard && (
                      <li className="nav-item">
                        <Link to={"/requestedbook"} className="nav-link">
                          Requested Book
                        </Link>
                      </li>
                    )}

          {showAdminBoard && (
                      <li className="nav-item">
                        <Link to={"/requestbuy"} className="nav-link">
                          Buy Request
                        </Link>
                      </li>
                    )}

          {getUserBoard  && (
            <li className="nav-item">
              <Link to={"/borrow"} className="nav-link">
                Return Book
              </Link>
            </li>
          )}


          {getUserBoard  && (
            <li className="nav-item">
              <Link to={"/cart"} className="nav-link">
              <img src={cart} style={{"height":"40px","width":"50px","paddingLeft":"10px"}}/>
              </Link>
            </li>
          )}
          </div>
          
        {currentUser ? (
          <div className="navbar-nav ml-auto" style={{"marginLeft":"700px"}}>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                <img src={logout} style={{"height":"40px","width":"50px","paddingLeft":"10px"}}/>
              </a>
            </li>
          </div>
        
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Protected Component ={Home}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/view-book/:id" element={<Protected Component ={Viewbook}/>} />
          <Route path="/displayBook" element={<Protected Component ={DisplayBook}/>} />
          <Route path="/borrow" element={<Protected Component ={Borrowbook}/>} />
          <Route path="/cart" element={<Protected Component ={Cart}/>} />
          <Route path="/checkout" element={<Protected Component ={Checkout}/>} />
          <Route path="/Displaybookuser" element={<Protected Component ={DisplayBookuser}/>} />
          <Route path="/addbook" element={<Protected Component ={Addbook}/>} />
          <Route path="/buy/:id" element={<Protected Component ={Updatebook}/>} />
          <Route path="/requestedbook" element={<Protected Component ={Request}/>} />
          <Route path="/requestbuy" element={<Protected Component ={BuyRequest}/>} />
          <Route path="/edit-book/:id" element={<Protected Component ={Addbook}/>} />
          <Route path="/register" element={<Register/>} /> 
        </Routes>
      </div>
    </div>
  );
};

export default App;