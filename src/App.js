import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth-service";

import Login from "./Components/Login";
//import Register from "./components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BoardUser from "./Components/BoardUser";
//import BoardModerator from "./components/BoardModerator";
import AdminBoard from "./Components/AdminBoard";
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
const App = () => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [getUserBoard, setUserBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
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
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}
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
          <div className="navbar-nav ml-auto" style={{"marginLeft":"750px"}}>
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
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/view-book/:id" element={<Viewbook/>} />
          <Route path="/displayBook" element={<DisplayBook/>} />
          <Route path="/borrow" element={<Borrowbook/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/Displaybookuser" element={<DisplayBookuser/>} />
          <Route path="/addbook" element={<Addbook/>} />
          <Route path="/requestedbook" element={<Request/>} />
          <Route path="/requestbuy" element={<BuyRequest/>} />
          <Route path="/edit-book/:id" element={<Addbook/>} />
          <Route path="/register" element={<Register/>} />
          
        </Routes>
      </div>
    </div>
  );
};

export default App;