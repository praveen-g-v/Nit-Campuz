import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/ngi logo.png";
import sideImage from "../../assets/SVG design/Wave.png";
import nitCampuz from "../../assets/Logo/nitcampuz logo.png";
import axios from "axios";
import { FaUser, FaLock, FaSignInAlt, FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [mobVersion, setMobVersion] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  useEffect(() => {
    if (props.ScreenSize < 800) {
      setMobVersion(false);
    } else {
      setMobVersion(true);
    }
  }, [props.ScreenSize]);

  function ValidateUser() {
    if (username.length >= 12) {
      let regnum = Number(username);
      if (
        isNaN(regnum) ||
        username.charAt(0) !== "7" ||
        username.charAt(1) !== "2" ||
        username.charAt(2) !== "1" ||
        username.charAt(3) !== "0"
      ) {
        setError("Please enter a valid username (7210XXXXXX format)");
        return false;
      }
      setError("");
      return true;
    }
    setError("Username must be at least 12 characters");
    return false;
  }

  function ValidatePassword() {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  }

  const handleClick = async () => {
    setButtonDisable(true);
    setIsLoading(true);
    setError("");

    if (!ValidateUser() || !ValidatePassword()) {
      setButtonDisable(false);
      setIsLoading(false);
      return;
    }

    try {
      const body = {
        uid: username,
        password: password,
      };
      await axiosPrivate
        .get("/login/", {
          params: { ...body },
        })
        .then((res) => {
          console.log(res.data.token);
          if (res.status === 200) {
            console.log("Avlidatdlid credentials");
            if (res.data.role === "admin") {
              navigate("/admin/dashboard");
            } else if (res.data.role === "faculty") {
              navigate("/faculty/dashboard");
            } else if (res.data.role === "student") {
              navigate("/home");
            }
          }
          setAuth(res?.data?.token);
          // props.updateUserLog(res.data);
          // props.updateUserBasicData(res.data);
          // navigate("/Home");
        })
        .catch((err) => {
          console.error(err);
          setError("Invalid credentials or server error. Please try again.");
        });
    } catch (err) {
      console.log(err);
      setError("Invalid credentials or server error. Please try again.");
    } finally {
      setButtonDisable(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        {/* Left Side (Desktop only) */}
        {mobVersion && (
          <div className="col-md-6 d-none d-md-flex bg-primary position-relative overflow-hidden">
            <div className="container p-5">
              <img
                src={nitCampuz}
                alt="University Logo"
                className="img-fluid mb-5"
                style={{ maxWidth: "200px" }}
              />
            </div>

            <img
              src={sideImage}
              alt="Wave background"
              className="position-absolute bottom-0 start-0 w-100"
              style={{ height: "40%" }}
            />

            <div className="position-absolute top-50 start-50 translate-middle text-center text-white p-4 w-100">
              <FaUniversity className="display-4 mb-3" />
              <h2 className="fw-bold mb-3">Welcome Back!</h2>
              <p className="fs-5">Sign in to access your student portal</p>
            </div>
          </div>
        )}

        {/* Right Side (Login Form) */}
        <div
          className={`${
            mobVersion ? "col-md-6" : "col-12"
          } d-flex align-items-center justify-content-center bg-light`}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="text-center mb-5">
              <img
                src={logo}
                alt="College Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: "80px" }}
              />
              <h2 className="fw-bold text-primary">Student Portal</h2>
              <p className="text-muted">Sign in to continue</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-danger"
              >
                {error}
              </motion.div>
            )}

            {/* Username Field */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  id="username"
                  value={username}
                  className="form-control"
                  type="text"
                  placeholder="7210XXXXXX"
                  maxLength={12}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  id="password"
                  value={password}
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  maxLength={25}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={buttonDisable}
              className={`btn btn-primary w-100 py-2 ${
                buttonDisable ? "disabled" : ""
              }`}
              onClick={handleClick}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  Login
                </>
              )}
            </motion.button>

            {/* Mobile Footer */}
            {!mobVersion && (
              <div className="text-center mt-4 text-muted">
                <small>Don't have an account? Contact administration</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
