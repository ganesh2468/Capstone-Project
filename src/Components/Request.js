import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Request() {
  const [users, setUsers] = useState([
    {
      bookName: "",
      authorName: "",
      rating:"",
      image: ""
    },
  ]);
    // const [books, setBooks] = useState([]);
    // const[bbooks,setBbooks]=useState([]);
    // const{id}=useParams();
    const navigate = useNavigate();

      //const blibrary = { bookName, authorName, rating };
      // console.log(library);

      const getAllBooks=()=>{
        axios.get("http://localhost:8080/api/v1/library/request")
        .then((response) =>{
          setUsers(response.data);
        }).catch(error=>{console.log(error);
        })
      }

      const requestBook=(id,book)=>{
        console.log(id);
        axios.post("http://localhost:8080/api/v1/library/borrow",book)
          .then((response) => {
            console.log(response.data);
            alert("Book Accepted Succesfully");
            window.location.reload();
            setUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
          axios.delete("http://localhost:8080/api/v1/library/request"+'/'+id)
        .then((response)=>{
          getAllBooks();
          console.log(response.data);
        }).catch(error=>{console.log(error);
        });
        //   axios.delete("http://localhost:8080/api/v1/library"+'/'+book)
        // .then((response)=>{
        //   getAllBooks();
        //   console.log(response.data);
        // }).catch(error=>{console.log(error);
        // });
        
    };

    const deleteBook=(id,book)=>{
        console.log(id);
        axios.post("http://localhost:8080/api/v1/library",book)
          .then((response) => {
            console.log(response.data);
            setUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        axios.delete("http://localhost:8080/api/v1/library/request"+'/'+id)
        .then((response)=>{
          getAllBooks();
          alert("Book Declined Succesfully");
          console.log(response.data);
          window.location.reload();
        }).catch(error=>{console.log(error);
        })
        
    };

    useEffect(() => {
      axios.get("http://localhost:8080/api/v1/library/request")
      .then((response) =>{
        setUsers(response.data);
      }).catch(error=>{console.log(error);
      })
    }, [])
    
  return (
    <>
     {/* < className="container"> */}
      <h2 className="text-centre">Requested Book List</h2>
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
                  onClick={() => requestBook(user.id,user)}
                style={{marginRight:'10px'}}>
                  Accept
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => deleteBook(user.id,user)}
                style={{marginRight:'10px'}}>
                  Decline
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

export default Request;