import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import LibraryServices from "./services/LibraryServices";
import { Button } from "bootstrap";
const DisplayBookuser = () => {
  // const [books, setBooks] = useState([]);

  const [users, setUsers] = useState([
    {
      bookName: "",
      authorName: "",
      rating:"",
      image: ""
    },
  ]);

  const navigate=useNavigate();
  //   useEffect(()=>{
  //     axios
  //     .get("http://localhost:8080/api/v1/library")
  //     .then((response) => {
  //       setBooks(
  // response.data
  //       );
  //       console.log(response.data);
  //     });
  //    },[])

  useEffect(() => {

    AllUsers();

  }, []);



  const AllUsers = async () => {

    axios.get('http://localhost:8080/api/v1/library').then((response)=>{

       setUsers(response.data);

       console.log(response);
      //  const array = Object.values(response);
      //  console.log(array.id);
      //  const books = [...new Set(array.map(q => q.bookName))];
      // console.log(books);

   })}
  // const getAllBooks = () => {
  //   axios
  //     .get("http://localhost:8080/api/v1/library")
  //     .then((response) => {
  //       setBooks(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const deleteBook = (bookid) => {
  //   console.log(bookid);
  //   axios
  //     .delete("http://localhost:8080/api/v1/library" + "/" + bookid)
  //     .then((response) => {
  //       getAllBooks();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
        {/* <table className="table table-striped table-bordered">
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
                  <Link className='btn btn-primary mx-2' to={`/view-book/${book.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

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
