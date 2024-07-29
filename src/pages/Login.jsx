import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [visibilityButton, setVisibilityButton] = useState(0);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "username") {
      if (!value) {
        newErrors.username = "Username is required";
      } else {
        delete newErrors.username;
      }
    }

    if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else {
        if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long";
        } else if (!/\d/.test(value)) {
          newErrors.password = "Password must contain at least one number";
        } else if (!/[!@#$%^&*]/.test(value)) {
          newErrors.password = "Password must contain at least one special character";
        } else {
          delete newErrors.password;
        }
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }

    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }
      if (!/\d/.test(password)) {
        newErrors.password = "Password must contain at least one number";
      }
      if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = "Password must contain at least one special character";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function login() {
    if (validateForm()) {
      setVisibilityButton(1);
      try {
        let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        let responsedata = await response.json();
        if (responsedata.success == true) {
          sessionStorage.setItem("auth_token", responsedata.data.token);
          sessionStorage.setItem("user_id", responsedata.data.userDetails.id);
          sessionStorage.setItem("user_name", responsedata.data.userDetails.username);
          sessionStorage.setItem("user_fullname", responsedata.data.userDetails.fullname);
          window.location.replace("/dashboard");
          setVisibilityButton(0);
        } else {
          setVisibilityButton(0);
          setErrors({ general: responsedata.message });
        }
      } catch (error) {
        setVisibilityButton(0);
        setErrors({ general: "An unexpected error occurred" });
      }
    }
  }

  return (
    <div
      className="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static"
      data-open="click"
      data-menu="vertical-menu-modern"
      data-col="blank-page">
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <div className="auth-wrapper auth-basic px-2 py-5">
              <div className="auth-inner my-2 mx-auto col-md-4">
                <div className="card mb-0">
                  <div className="card-body">
                    <h2 className="brand-text text-primary ms-1 p-2 text-center">
                      Login Here
                    </h2>
                    <form className="auth-login-form mt-2">
                      <div className="mb-1">
                        <label htmlFor="login-email" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={username}
                          onChange={handleChange}
                          placeholder="Enter Username"
                          autoFocus
                          required
                        />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                      </div>

                      <div className="mb-1">
                        <div className="d-flex justify-content-between">
                          <label className="form-label" htmlFor="login-password">
                            Password
                          </label>
                        </div>
                        <div className="input-group input-group-merge form-password-toggle">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control form-control-merge"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                          />
                          <span
                            className="input-group-text cursor-pointer"
                            onClick={togglePasswordVisibility}>
                            <i data-feather={showPassword ? "eye-off" : "eye"}></i>
                          </span>
                        </div>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                      </div>

                      {errors.general && <div className="text-white p-1 bg-danger mb-2">{errors.general}</div>}

                      {visibilityButton === 0 ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={login}>
                          Log in
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-100"
                          type="button"
                          disabled>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"></span>
                          {"   "}Please Wait...
                        </button>
                      )}
                    </form>
                    <p className="text-center mt-2">
                      <Link to="/sign-up" className="btn btn-primary w-100">
                        <span>Sign up</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
