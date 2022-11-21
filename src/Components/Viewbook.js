import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Viewbook() {
    const[library,setLibrary]=useState({
        bookName:"",
        authorName:"",
        rating:"",
    });

    const{id}=useParams();

    useEffect(() => {
        loadBook();
    }, [])

    const loadBook=async()=>{
        const result=await axios.get(`http://localhost:8080/api/v1/library/${id}`);
        setLibrary(result.data);
    };
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Book Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {library.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Book Name:</b>
                  {library.bookName}
                </li>
                <li className="list-group-item">
                  <b>Author Name:</b>
                  {library.authorName}
                </li>
                <li className="list-group-item">
                  <b>Rating:</b>
                  {library.rating}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/DisplayBookuser"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Viewbook;