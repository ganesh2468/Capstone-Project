import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Updatebook() {
  let navigate = useNavigate();

  const {id}=useParams();

  const [user, setUser] = useState({
    bookName: "",
    authorName: "",
    rating:"",
    image: "",
    status:""
  });

  const { bookName,authorName,rating,image,status} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    loadUser();
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:8080/api/v1/library/buy"+'/'+id,user).then((response)=>{
        setUser(response.data);
        alert("Book Updated")
    navigate("/");
        console.log(response);
    })
    
  };

  function PreviewImage(e) {
    e.preventDefault();
    let oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);
    oFReader.onload = function (oFREvent) {

      user.image = oFREvent.target.result;
    };
  }

  const loadUser=async()=>{
   await axios.get(`http://localhost:8080/api/v1/library/requestbuy/${id}`).then((response)=>{
        setUser(response.data);
        console.log(response);
    })
  }

  return (
    <><form onSubmit={(e) => onSubmit(e)}>
    <div className="card card-registration my-4">
      <div className="row g-0">
        
        <div className="col-xl-6">
          <div className="card-body p-md-5 text-black">
            <h3 className="mb-5 text-uppercase">Update a Book</h3>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input type="text" name="bookName" value={bookName} onChange={(e) => onInputChange(e)} id="form3Example1m" className="form-control form-control-lg" placeholder="Book name" />
        
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input type="text" name="authorName" value={authorName} onChange={(e) => onInputChange(e)} id="form3Example1n" className="form-control form-control-lg" placeholder="Author name" />
                  
                </div>
              </div>
            </div>
           
            <div className="form-outline mb-4">
              <input type="text" name="rating" value={rating} onChange={(e) => onInputChange(e)} id="form3Example8" className="form-control form-control-lg" placeholder="Price"/>
            </div>

            <div className="form-outline mb-4">
              <input type="text" id="form3Example9" name="status" value={status} onChange={(e) => onInputChange(e)} className="form-control form-control-lg" placeholder="Status"/>
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
            
            <div className="d-flex justify-content-end pt-3">
              <button type="submit" className="btn btn-warning btn-lg ms-2">Update Status</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </form></>
  );
}