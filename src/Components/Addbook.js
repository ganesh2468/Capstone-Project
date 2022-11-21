// const Addbook = () => {
//   console.log("This is ES6 version of Project 2");
//   class Book {
//     constructor(name, author, type) {
//       this.name = name;
//       this.author = author;
//       this.type = type;
//     }
//   }
//   class Display {
//     add(book) {
//       console.log("Adding to UI");
//       let tableBody = document.getElementById("tableBody");
//       let uiString = `<tr>
//                             <td>${book.name}</td>
//                             <td>${book.author}</td>
//                             <td>${book.type}</td>
//                         </tr>`;
//       tableBody.innerHTML += uiString;
//     }

//     clear() {
//       let libraryForm = document.getElementById("libraryForm");
//       libraryForm.reset();
//     }

//     validate(book) {
//       if (book.name.length < 2 || book.author.length < 2) {
//         return false;
//       } else {
//         return true;
//       }
//     }

//     show(type, displayMessage) {
//       let message = document.getElementById("message");
//       let boldText;
//       if (type === "success") {
//         boldText = "Success";
//       } else {
//         boldText = "Error!";
//       }
//       message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
//                                 <strong>${boldText}:</strong> ${displayMessage}
//                                 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                 <span aria-hidden="true">×</span>
//                                 </button>
//                             </div>`;
//       setTimeout(function () {
//         message.innerHTML = "";
//       }, 5000);
//     }
//   }
//   // Add submit event listener to libraryForm
//   function libraryFormSubmit(e) {
//     console.log("You have submitted library form");
//     let name = document.getElementById("bookName").value;
//     let author = document.getElementById("author").value;
//     let type;
//     let fiction = document.getElementById("fiction");
//     let programming = document.getElementById("programming");
//     let cooking = document.getElementById("cooking");

//     if (fiction.checked) {
//       type = fiction.value;
//     } else if (programming.checked) {
//       type = programming.value;
//     } else if (cooking.checked) {
//       type = cooking.value;
//     }

//     let book = new Book(name, author, type);
//     console.log(book);

//     let display = new Display();

//     if (display.validate(book)) {
//       display.add(book);
//       display.clear();
//       display.show("success", "Your book has been successfully added");
//     } else {
//       // Show error to the user
//       display.show("danger", "Sorry you cannot add this book");
//     }

//     e.preventDefault();
//   }

//   return (
//     <>
//       <div className="container">
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <form id="libraryForm">
//           <div className="form-group row">
//             <label htmlFor="bookName" className="col-sm-2 col-form-label">
//               Name
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="bookName"
//                 placeholder="Book Name"
//               />
//             </div>
//           </div>
//           <div className="form-group row">
//             <label htmlFor="Author" className="col-sm-2 col-form-label">
//               Author
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="author"
//                 placeholder="Author"
//               />
//             </div>
//           </div>
//           <fieldset className="form-group">
//             <div className="row">
//               <legend className="col-form-label col-sm-2 pt-0">Type</legend>
//               <div className="col-sm-10">
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="type"
//                     id="fiction"
//                     value="fiction"
//                   />
//                   <label className="form-check-label" htmlFor="fiction">
//                     Fiction
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="type"
//                     id="programming"
//                     value="programming"
//                   />
//                   <label className="form-check-label" htmlFor="programming">
//                     Computer Programming
//                   </label>
//                 </div>
//                 <div className="form-check disabled">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="type"
//                     id="cooking"
//                     value="cooking"
//                   />
//                   <label className="form-check-label" htmlFor="cooking">
//                     Cooking
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </fieldset>

//           <div className="form-group row">
//             <div className="col-sm-10">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 onClick={libraryFormSubmit}
//               >
//                 Add Book
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };
// export default Addbook;


import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
//import LibraryServices from "./services/LibraryServices";
import axios from "axios";
const Addbook = () => {
  // const [bookName, setbookName] = useState("");
  // const [authorName, setauthorName] = useState("");
  // const [rating, setrating] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [user, setUser] = useState({
    bookName: "",
    authorName: "",
    rating:"",
    image: "",
    status:""
  });
  const { bookName, authorName, rating,image,status } = user;
  
const onInputChange = (e) => {
 setUser({ ...user, [e.target.name]: e.target.value });
 };



  // const saveOrUpdateLibrary = (e) => {
  //   e.preventDefault();

  //   const library = { bookName, authorName, rating };
  //   console.log(library);
  //   if (id) {
  //       axios
  //       .put("http://localhost:8080/api/v1/library"+'/'+id,library)
  //       .then((response) => {
  //         navigate("/DisplayBook");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //       axios
  //       .post("http://localhost:8080/api/v1/library",library)
  //       .then((response) => {
  //         console.log(response.data);

  //         navigate("/DisplayBook");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };
  const onSubmit = async (e) => {

    e.preventDefault();

    console.log(user.bookName);

    console.log(user.authorName);
    console.log(user.rating);
    console.log(user.image);
    if (id) {
            axios
            .put("http://localhost:8080/api/v1/library"+'/'+id,user)
            .then((response) => {
              alert("Book Updated Succesfully");
              navigate("/DisplayBook");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else{
     await axios.post("http://localhost:8080/api/v1/library",user);

     alert("Book Added Succesfully");

     navigate("/DisplayBook")
        }
   };
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/v1/library")
  //     .then((response) => {
  //       setbookName(response.data.bookName);
  //       setauthorName(response.data.authorName);
  //       setrating(response.data.rating);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(()=>{
    loadUser();
  },[])

  const loadUser=async()=>{
    const result=await axios.get(`http://localhost:8080/api/v1/library/${id}`)
    setUser(result.data)
  }
  function PreviewImage(e) {
    e.preventDefault();
    let oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);
    oFReader.onload = function (oFREvent) {

      user.image = oFREvent.target.result;
    };
  }
  // useEffect(() => {

  //     LibraryServices.getlibraryById(id).then((response) =>{
  //         setbookName(response.data.bookName)
  //         setauthorName(response.data.authorName)
  //         setrating(response.data.rating)
  //     }).catch(error => {
  //         console.log(error)
  //     })
  // }, [])

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Book</h2>;
    } else {
      return <h2 className="text-center">Add Book</h2>;
    }
  };
  return (
    <div>
      <br />
      <br />
      <div className="container" >
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop:'10px'}}>
            {title()}
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-2">
                  <label className="form-label"> Book Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Book name"
                    name="bookName"
                    className="form-control"
                    value={bookName}
                   onChange={(e) =>onInputChange(e)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Author Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Author name"
                    name="authorName"
                    className="form-control"
                    value={authorName}
                    onChange={(e) =>onInputChange(e)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Rating:</label>
                  <input
                    type="text"
                    placeholder="Enter rating"
                    name="rating"
                    className="form-control"
                    value={rating}
                    onChange={(e) =>onInputChange(e)}
                  ></input>
                  </div>

                  <div className="form-group mb-2">
                  <label className="form-label"> Status:</label>
                  <input
                    type="text"
                    placeholder="Enter status"
                    name="status"
                    className="form-control"
                    value={status}
                    onChange={(e) =>onInputChange(e)}
                  ></input>
                </div>
                <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                placeholder="Choose Image"
                name="image"
                // value={image}
                accept="image/*"
                onChange={(e) => PreviewImage(e)}
              />
            </div>

                <button
                  className="btn btn-success"
                  // onClick={(e) => saveOrUpdateLibrary(e)}
                style={{marginRight:'10px'}}>
                  Submit
                </button>
                <Link to="/DisplayBook" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addbook;
