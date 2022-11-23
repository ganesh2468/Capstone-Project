import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function BuyRequest() {
  const [users, setUsers] = useState([
    {
      bookName: "",
      authorName: "",
      rating:"",
      image: "",
      status:""
    },
  ]);

    const navigate = useNavigate();

      const getAllBooks=()=>{
        axios.get("http://localhost:8080/api/v1/library/requestbuy")
        .then((response) =>{
          setUsers(response.data);
        }).catch(error=>{console.log(error);
        })
      }

      const requestBook=(id,book)=>{
        console.log(id);

              console.log(book);
              axios
            .put("http://localhost:8080/api/v1/library/buy"+'/'+id)
            .then((response) => {
              setUsers(response.data);

              
            })
            .catch((error) => {
              console.log(error);
            });      
    };

    const deleteBook=(id,book)=>{
        console.log(id);
        axios.delete("http://localhost:8080/api/v1/library/requestbuy"+'/'+id)
        .then((response)=>{
          getAllBooks();
          alert("Book Removed Succesfully");
          console.log(response.data);
          window.location.reload();
        }).catch(error=>{console.log(error);
        })
        
    };

    useEffect(() => {
      axios.get("http://localhost:8080/api/v1/library/requestbuy")
      .then((response) =>{
        setUsers(response.data);
      }).catch(error=>{console.log(error);
      })
    }, [])
    
  return (
    <>
      <h2 className="text-centre">Requested Book List</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {users.map((user, index) => {
                  return (
                    <div className="col">
                      <div className="card">
                        <img src={user.image} className="card-img-top" style={{"width":"290px","height":"200px"}} alt="..." / >
                        <div className="card-body">
                          <h5 className="card-title">{user.bookName}</h5>
                          <p className="card-text">{user.authorName}</p>
                          <p className="card-text">{user.rating}</p>
                <Link className="btn btn-info" 
                to={`/buy/${user.id}`}
                  style={{marginRight:"10px"}}>Update and Accept</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBook(user.id,user)}
                style={{marginRight:'10px'}}>
                  Remove
                </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
      </div>
      </>
  )
}

export default BuyRequest;