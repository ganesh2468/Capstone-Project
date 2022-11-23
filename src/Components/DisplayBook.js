
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
const DisplayBook = () => {
  const [books, setBooks] = useState([]);
  const{id}=useParams();
    const navigate = useNavigate();

useEffect(() => {
  axios.get("http://localhost:8080/api/v1/library")
  .then((response) =>{
    setBooks(response.data);
  }).catch(error=>{console.log(error);
  })
}, [])

const getAllBooks=()=>{
  axios.get("http://localhost:8080/api/v1/library")
  .then((response) =>{
    setBooks(response.data);
  }).catch(error=>{console.log(error);
  })
}

const deleteBook=(bookid)=>{
    console.log(bookid);
    axios.delete("http://localhost:8080/api/v1/library"+'/'+bookid)
    .then((response)=>{
      getAllBooks();
    }).catch(error=>{console.log(error);
    })
}

const Borrowbook=(id,book)=>{
  console.log(id);
  axios.post("http://localhost:8080/api/v1/library/borrow",book)
    .then((response) => {
      console.log(response.data);
      window.location.reload();
     setBooks(response.data);
      navigate("/Displaybookuser");
    })
    .catch((error) => {
      console.log(error);
    });
  axios.delete("http://localhost:8080/api/v1/library"+'/'+id)
  .then((response)=>{
    getAllBooks();
    console.log(response.data);
  }).catch(error=>{console.log(error);
  })
};




  return (
    <div className="container">
      <h2 className="text-centre">Book List</h2>
      <div className="row">
      {/* <Link to="/Addbook" className="btn btn-primary mb-2">Add Book</Link> */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index) => (
              <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{book.bookName} </td>
                <td>{book.authorName}</td>
                <td>{book.rating}</td>
                <td>
                  <Link className="btn btn-info" to={`/edit-book/${book.id}`}
                  style={{margin:"10px"}}>Update</Link>
                  <Link className="btn btn-danger" onClick={()=>deleteBook(book.id) }>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DisplayBook;