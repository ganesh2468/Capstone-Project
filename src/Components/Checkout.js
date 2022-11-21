import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [users, setUsers] = useState([
    {
      bookName: "",
      authorName: "",
      rating:"",
      image: ""
    },
  ]);
    const navigate = useNavigate();

    const successcheckout=()=>{
        // alert("Book Bought Successfully");
        // navigate("/Displaybookuser");
        // window.location.reload();
        axios.delete("http://localhost:8080/api/v1/library/buy")
  .then((response)=>{
    console.log(response.data);
  }).catch(error=>{console.log(error);
  })
    }
    
  return (
    <>
      <h2  classNameName="text-centre">Add Details And Checkout</h2>
      <div  classNameName="row row-cols-1 row-cols-md-3 g-4">
<form  className="row g-3">
  <div  className="col-md-6">
    <label  htmlFor="inputEmail4"  className="form-label">Email</label>
    <input type="email"  className="form-control" id="inputEmail4" required/>
  </div>
  <div  className="col-md-6">
    <label  htmlFor="inputPassword4"  className="form-label">Password</label>
    <input type="password"  className="form-control" id="inputPassword4" required/>
  </div>
  <div  className="col-12">
    <label  htmlFor="inputAddress"  className="form-label">Address</label>
    <input type="text"  className="form-control" id="inputAddress" placeholder="1234 Main St" required/>
  </div>
  <div  className="col-12">
    <label  htmlFor="inputAddress2"  className="form-label">Address 2</label>
    <input type="text"  className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" required/>
  </div>
  <div  className="col-md-6">
    <label  htmlFor="inputCity"  className="form-label">City</label>
    <input type="text"  className="form-control" id="inputCity" required / >
  </div>
  <div  className="col-md-4">
    <label  htmlFor="inputState"  className="form-label">State</label>
    <select id="inputState"  className="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div  className="col-md-2">
    <label  htmlFor="inputZip"  className="form-label">Zip</label>
    <input type="text"  className="form-control" id="inputZip" required/>
  </div>
  <div  className="col-12">
    <div  className="form-check">
      <input  className="form-check-input" type="checkbox" id="gridCheck" />
      <label  className="form-check-label"  htmlFor="gridCheck">
        Save My Details For Future Use
      </label>
    </div>
    <br /><br />
  </div>
  <div  className="col-12">
  <h2  className="text-centre">Payment</h2>
  <div  className="form-check">
  <input  className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label  className="form-check-label"  htmlFor="flexRadioDefault1">
    Credit Card
  </label>
</div>
<div  className="form-check">
  <input  className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked required/>
  <label  className="form-check-label"  htmlFor="flexRadioDefault2">
    Debit Card
  </label>
</div>
<div  className="row" style={{"marginTop":"20px"}}>
  <div  className="col">
    Name On card
    <input type="text"  className="form-control" placeholder="Full name" aria-label="Full name" required/>
  </div>
  <div  className="col">
  Card Number
    <input type="text"  className="form-control" placeholder="Card Number" aria-label="Card Number" required/>
  </div>
  <div  className="row g-2">

  <div  className="col-sm-2">
    Expiration Date
    <input type="date"  className="form-control" placeholder="Expiration Date" aria-label="Expiration Date" required/>
  </div>
  <div  className="col-sm-2">
    CVV
    <input type="text"  className="form-control" placeholder="CVV" aria-label="CVV" required/>
  </div>
</div>
</div>
    <button  className="btn btn-primary" type="submit" style={{"marginTop":"60px","textAlign":"center"}} onClick={() => successcheckout()}
    >Checkout</button>
  </div>
</form>
      </div>
      </>
  )
}

export default Checkout;