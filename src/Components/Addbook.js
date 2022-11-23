import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Addbook = () => {
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
                
                accept="image/*"
                onChange={(e) => PreviewImage(e)}
              />
            </div>

                <button
                  className="btn btn-success"
                 
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
