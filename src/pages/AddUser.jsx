import React, { useState } from "react";

function AddUserDetail() {
  const [username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [role,setRole]=useState('');

  async function addNewUser() {
    if (username!="" && password!="" && role!="") {
    let token=  sessionStorage.getItem("auth_token");
    
    let response = await  fetch(`${import.meta.env.VITE_API_BASE_URL}/register`,{ method: "POST",  headers: {
     "Content-Type": "application/json",
     'Authorization': 'Bearer ' + token,
   },
   body: JSON.stringify({ 
     username: username,
     password: password,
     email: email,
     role: role
 }),
});
    let responsedata = await response.json();
     if (responsedata.success==true) {
       swal({
        title: "Good job!",
        text: "A New User Has Been Added Successfully",
        icon: "success",
        button: "Ok",
      }).then(function() {
        window.location.replace('/admin-member');
      });
        
       
     }else{
       alert("You Have Entered Wrong Credentials");
     }
    
    }
  }

  return (
    <>
        <div className="container p-0">
          <div className="content-header row">
            <div className="content-header-left col-md-9 col-12 mb-2">
              <div className="row breadcrumbs-top">
                <div className="col-12">
                  <h2 className="content-header-title float-start mb-0">
                   Add User Form
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="border-bottom">
             
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-1">
                      <label className="form-label fs-5 fw-bolder" htmlFor="username">Username</label>
                      <input className="form-control" type="text"   htmlFor="username" name="username" id="username" onChange={(e)=>setUserName(e.target.value)} required />
                      </div>
                      <div className="col-md-6 mb-1">
                      <label className="form-label fs-5 fw-bolder" htmlFor="password">Password</label>
                      <input className="form-control" type="password"  htmlFor="password" name="password" id="password"  onChange={(e)=>setPassword(e.target.value)} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-1">
                      <label className="form-label fs-5 fw-bolder" htmlFor="email">Email</label>
                      <input className="form-control" type="email"  htmlFor="email" name="email" id="email"  onChange={(e)=>setEmail(e.target.value)}/>
                      </div>
                      <div className="col-md-6 mb-1">
                      <label type="number" htmlFor='role' className="form-label fs-5 fw-bolder">Role</label>
                      <select className="form-control" name="role" id="role"     required onChange={(e)=>setRole(e.target.value)}>
                       <option value="">Select</option>
                       <option value="admin">Admin</option>
                       <option value="user">User</option>
                       </select>
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <div className="col-auto">
                      <button type="button" className="btn btn-primary" onClick={addNewUser}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}
export default AddUserDetail; 