import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    dob: '',
    profession: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));

    // Validate the input as it changes
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'fullname':
        if (!value) {
          newErrors.fullname = "Full name is required.";
        } else {
          delete newErrors.fullname;
        }
        break;
      case 'username':
        if (!value) {
          newErrors.username = "Username is required.";
        } else {
          delete newErrors.username;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = "Password is required.";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long.";
        } else if (!/[a-zA-Z]/.test(value)) {
          newErrors.password = "Password must contain at least one letter.";
        } else if (!/\d/.test(value)) {
          newErrors.password = "Password must contain at least one number.";
        } else if (!/[!@#$%^&*]/.test(value)) {
          newErrors.password = "Password must contain at least one special character.";
        } else {
          delete newErrors.password;
        }
        break;
      case 'dob':
        if (!value) {
          newErrors.dob = "DOB is required.";
        } else {
          delete newErrors.dob;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    // Full name
    if (!inputs.fullname) {
      newErrors.fullname = "Full name is required.";
    }
    // Username
    if (!inputs.username) {
      newErrors.username = "Username is required.";
    }
    // Password
    if (!inputs.password) {
      newErrors.password = "Password is required.";
    } else if (inputs.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[a-zA-Z]/.test(inputs.password)) {
      newErrors.password = "Password must contain at least one letter.";
    } else if (!/\d/.test(inputs.password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(inputs.password)) {
      newErrors.password = "Password must contain at least one special character.";
    }
    // DOB
    if (!inputs.dob) {
      newErrors.dob = "DOB is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit form
      await addNewUser();
    }
  };

  async function addNewUser() {
    if (validateForm()) {
      let token = sessionStorage.getItem("auth_token");

      let response = await  fetch(`${import.meta.env.VITE_API_BASE_URL}/register`,{ method: "POST",  headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token,
      },
          body: JSON.stringify(inputs),
        }
      );

      let responsedata = await response.json();

      if (responsedata.success) {
        swal({
          title: "Good job!",
          text: responsedata.message,
          icon: "success",
          button: "Ok",
        }).then(function () {
          window.location.replace("/");
        });
      } else {
        let errorMessage = '';
        for (const field in responsedata.message) {
          if (responsedata.message.hasOwnProperty(field)) {
            responsedata.message[field].forEach(error => {
              errorMessage += `${error}\n`;  // Add a newline for each error
            });
          }
        }
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
          button: "Ok",
        });
      }
    }
  };

  return (
    <>
      <div className="row p-0">
        <div className="card col-md-6 offset-md-3 my-2">
        <div className="col-auto">
      
        <Link to="/" className="btn btn-primary mt-2">
        Back To Login
        </Link>
        </div>
          <h2 className="text-center">Sign Up Form</h2>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-1">
                  <label className="form-label fs-5 fw-bolder" htmlFor="fullname">
                    Full name <sup className="text-danger fs-4">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="fullname"
                    id="fullname"
                    onChange={handleChange}
                  />
                  {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
                </div>
                <div className="col-md-12 mb-1">
                  <label className="form-label fs-5 fw-bolder" htmlFor="username">
                    Username <sup className="text-danger fs-4">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                  />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="col-md-12 mb-1">
                  <label className="form-label fs-5 fw-bolder" htmlFor="password">
                    Password <sup className="text-danger fs-4">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="col-md-12 mb-1">
                  <label className="form-label fs-5 fw-bolder" htmlFor="dob">
                    DOB <sup className="text-danger fs-4">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="dob"
                    id="dob"
                    onChange={handleChange}
                  />
                  {errors.dob && <div className="text-danger">{errors.dob}</div>}
                </div>
                <div className="col-md-12 mb-1">
                  <label className="form-label fs-5 fw-bolder" htmlFor="profession">
                    Profession
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="profession"
                    id="profession"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-1">
                  <label className="form-label fs-5 fw-bolder" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    name="address"
                    id="address"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-auto">
                  <button onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                  >
                    
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
