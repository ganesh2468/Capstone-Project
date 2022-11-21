import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function Cart() {
  const [users, setUsers] = useState([
    {
      bookName: "",
      authorName: "",
      rating:"",
      image: "",
      quantity:"",
      status:""
    },
  ]);

  var button =document.getElementById("Button");
  var totalCartPrice = 0;
  var totalstatus=0;
  // button.disabled = true;
    const navigate = useNavigate();

    const handleDecrement = (book_id) => {
      setUsers(cart => 
          users.map( (book) => 
              book_id === book.id ? {...book, quantity: book.quantity - (book.quantity > 1 ? 1:0) } : book
          )
      );
      // updateCartQuantity(book_id,"dec");
  }
  const handleIncrement = (book_id) => {
      setUsers(cart => 
          users.map( (book) => 
              book_id === book.id ? {...book, quantity: book.quantity + (book.quantity < 10 ? 1:0)} : book
          )
      );
      // updateCartQuantity(book_id,"inc");
  }



      const getAllBooks=()=>{
        axios.get("http://localhost:8080/api/v1/library/buy")
        .then((response) =>{
          setUsers(response.data);
        }).catch(error=>{console.log(error);
        })
      }

      const deleteBook=(id,book)=>{
        console.log(id);
        axios.delete("http://localhost:8080/api/v1/library/buy"+'/'+id)
        .then((response)=>{
          getAllBooks();
          console.log(response.data);
        }).catch(error=>{console.log(error);
        })
    };

    const requestBook=(id,book)=>{
      console.log(id);
      alert("book requested successfully");
      axios.post("http://localhost:8080/api/v1/library/requestbuy",book)
      .then((response)=>{
        console.log(response.data);
      }).catch(error=>{console.log(error);
      })
  };

    useEffect(() => {
      axios.get("http://localhost:8080/api/v1/library/buy")
      .then((response) =>{
        setUsers(response.data);
      }).catch(error=>{console.log(error);
      })
    }, [])


    const checkout=()=>{
        navigate('/checkout');
        alert("Proceed to checkout for price $"+totalCartPrice);
    }
    const Checkout=()=>{
        navigate("/checkout")
    }
    var cart_HTML = '';
    if(users.length > 0)
    {
      cart_HTML =
        <><div className="container">
    <h2 className="text-centre">Cart</h2>
    <div className="row" style={{"marginTop":"60px","textAlign":"center"}}> 
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Book</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Price</th>
            <th>Status</th>
            {/* <th>Quantity</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map( (book,index) => {
            totalCartPrice += book.rating;
            totalstatus+=book.status;
            return(
            <tr>
              <th scope="row" key={index}>{index+1}</th>
              <td><img src={book.image} className="card-img-top" style={{"width":"150px","height":"100px"}} alt="..." / ></td>
              <td>{book.bookName} </td>
              <td>{book.authorName}</td>
              <td>{"$"+book.rating
              // *book.quantity
              }</td>
              <td>{book.status}</td>
              {/* <td width="15%">
                                  <div className="input-group">
                                      <button type="button" onClick={() => handleDecrement(book.id)} className="input-group-text">-</button>
                                      <div className="form-control text-center">{book.quantity}</div>
                                      <button type="button" onClick={() => handleIncrement(book.id)} className="input-group-text">+</button>
                                  </div>
                              </td> */}
              <td><Link className="btn btn-danger" onClick={()=>deleteBook(book.id) }>Delete</Link></td>
              <td><Link className="btn btn-primary" onClick={()=>requestBook(book.id,book) }>Request</Link></td>
              <td><Link className="btn btn-info" to={`/edit-book/${book.id}`}
                  style={{margin:"10px"}}>Update</Link></td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
  <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                  <div className="card card-body mt-3">
                      <h4>Grand Total:
                          <span className="float-end">{"$"+totalCartPrice}</span>
                      </h4>
                      <h4>Grand Status:
                          <span className="float-end">{"$"+totalstatus}</span>
                      </h4>
                      <hr />
                      {/* <Link to="/checkout" className="btn btn-primary" id="Button" onClick={() => alert("Proceed to checkout for price $"+totalCartPrice)}> Checkout </Link> */}
                  <button
                  className="btn btn-success"
                  onClick={() => checkout()}
                  disabled={totalstatus}
                  >
                  Checkout
                </button>
                
                  </div>
              </div>
          </div> 
          </> 
}
else
{
    cart_HTML = <div>
        <div className="card card-body py-5 text-center shadow-sm">
            <h4>Your Shopping Cart is Empty</h4>
        </div>
    </div>
}
  return (
    <>
        <div>
            {/* <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div> */}

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cart_HTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>     
      </>
  )
}
export default Cart;