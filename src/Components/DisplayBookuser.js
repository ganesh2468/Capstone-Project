import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const DisplayBookuser = () => {


  const [users, setUsers] = useState([
    {
      bookName: "",
      authorName: "",
      rating:"",
      image: ""
    },
  ]);

  const navigate=useNavigate();

  useEffect(() => {

    AllUsers();

  }, []);



  const AllUsers = async () => {

    axios.get('http://localhost:8080/api/v1/library').then((response)=>{

       setUsers(response.data);

       console.log(response);
   })}


  const requestBook=(id,book)=>{
    console.log(id);
    axios.post("http://localhost:8080/api/v1/library/request",book)
      .then((response) => {
        console.log(response.data);
        alert("Book Requested Succesfully");
        setUsers(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
      axios.delete("http://localhost:8080/api/v1/library"+'/'+id)
        .then((response)=>{
          console.log(response.data);
        }).catch(error=>{console.log(error);
        });
};

const cartBook=(id,book)=>{
  console.log(id);
  axios.post("http://localhost:8080/api/v1/library/buy",book)
    .then((response) => {
      console.log(response.data);
      alert("Book added to cart Succesfully");
      navigate('/cart')
      setUsers(response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <>
      <h2 className="text-centre">Book List</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">

        {users.map((user, index) => {
          return (
            <div className="col">
              <div className="card">
                 <img src={user.image} class="card-img-top" style={{"width":"290px","height":"200px"}} alt="..." / >
                <div className="card-body">
                   <h5 className="card-title">{user.bookName}</h5>
                  <p className="card-text">{user.authorName}</p>
                  <p className="card-text">{user.rating}</p>
                  <button
                  className="btn btn-success"
                  onClick={() =>requestBook(user.id,user)}
                style={{marginRight:'10px'}}>
                  Request
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => cartBook(user.id,user)}
                style={{marginRight:'10px'}}>
                  Buy Book
                </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default DisplayBookuser;
