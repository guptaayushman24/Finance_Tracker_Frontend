import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SigninComponent.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setFirstName,
  setLastName,
  setProfileEmailAddress,
} from "../feature/slice/Slice";
import axiosInstance from "../util/AxiosInstance";
function SigninComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function routeToSignup() {
    navigate("/signup");
  }
  
  // State for storing the fields
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // State for displaying. error if any invalid field is filled
  const [errorEmailAddress, setErrorEmailAddress] = useState(false);
  const [errorPassword, SeterrorPassword] = useState(false);

  // State for the Signin Button
  const [loading, SetLoading] = useState(false);

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const signIn = async () => {
    if (emailAddress.length >= 0 && !emailRegex.test(emailAddress)) {
      console.log("Error");
      setErrorEmailAddress(true);
    } else {
      setErrorEmailAddress(false);
    }

    if (password.length >= 0 && !passwordRegex.test(password)) {
      SeterrorPassword(true);
    } else {
      SeterrorPassword(false);
    }

    if (errorEmailAddress == false && errorPassword == false) {
      // If there is no error then signin the user
      SetLoading(true);
      
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/signin",
          {
            email: emailAddress,
            password: password,
          },
        );
        if (response.status == 200) {
          console.log("Response Status"+" "+response.status);
          SetLoading(true);
          console.log("Response is" + " " + response);
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("id", response.data.id);
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post(
          "http://localhost:8080/auth/profile",
          {
            emailAddress: emailAddress,
          },
        )
        if (response.status == 200) {
          console.log("Status is"+" "+response.status)
          console.log("Token is"+" "+token);
          dispatch(setFirstName(response.data.firstName));
          dispatch(setLastName(response.data.lastName));
          navigate("/viewfinance");
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <h2 className="signin-title">Welcome Back 👋</h2>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-input"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          {errorEmailAddress ? (
            <div className="error">*Enter valid Email Address</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword ? (
            <div className="error">
              *Password should contain atleast one capital letter and atleast
              one digit and atleast one special character and atleast length
              should be 6
            </div>
          ) : null}
        </div>

        <button className="signin-btn" onClick={signIn} disabled={loading}>
          Sign In
        </button>

        <p className="signin-footer">
          Don’t have an account? <span onClick={routeToSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SigninComponent;
