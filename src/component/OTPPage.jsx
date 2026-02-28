import React, { useState } from "react";
import "../css/OTP.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const OTPPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [isOTPvalidated, seIsOTPValdated] = useState(false);
  const [storeOtp, setStoreOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const sendOTP = async () => {
    // Setting OTP in the state
    try {
      const response = await axios.post("http://localhost:8080/generateotp", {
        emailAddress: emailAddress,
      });
      if (response.status == 200) {
        alert("OTP Sent Successfully !!!!");
      }
    } catch (error) {
      console.log("Error in the OTP", error);
    }
  };

  const validateOTP = async () => {
    try {
      console.log("OTP is", storeOtp);
      var enteredOTP = "";
      for (let i = 0; i < storeOtp.length; i++) {
        enteredOTP = enteredOTP + storeOtp[i];
      }
      const response = await axios.post("http://localhost:8080/validateotp", {
        emailAddress: emailAddress,
        otp: parseInt(enteredOTP),
      });
      if (response.status == 200) {
        if (response.data.status == 1) {
          alert("OTP Validated");
          const response = await axios.post("http://localhost:8080/deleteotp", {
            emailAddress: emailAddress,
          });
          if (response.status == 200) {
            seIsOTPValdated(true);
          }
        } else if (response.data.status == 0) {
          seIsOTPValdated(false);
          alert("Invalid OTP");
        } else if (response.data.status == -1) {
          alert("Please send the OTP again");
        }
      }
    } catch (error) {
      alert("Error in validating OTP", error);
    }
  };

  const handleChange = (element, index) => {
    const value = element.value;

    if (!/^[0-9]?$/.test(value)) return; // allow only digits

    const newOtp = [...storeOtp];
    newOtp[index] = value;
    setStoreOtp(newOtp);

    // Auto move to next input
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const resetPassword = async () => {
    const response = await axios.post("http://localhost:8080/resetpassword", {
      emailAddress: emailAddress,
      newPassword: newPassword,
    });
    if (response.status == 200) {
      alert("Password Updated Successfully");
      navigate("/signin");
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-card">
        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">
          Enter your email address to receive a 6-digit OTP
        </p>

        {/* Email Field */}
        <div className="email-container">
          <input
            type="email"
            placeholder="Enter your email address"
            className="email-input"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>

        {/* OTP Input */}
        {!isOTPvalidated ? (
          <div className="otp-input-container">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <input
                key={item}
                type="text"
                maxLength="1"
                className="otp-input"
                onChange={(e) => handleChange(e.target, item)}
              />
            ))}
          </div>
        ) : null}

        {/* Buttons Section */}
        {!isOTPvalidated ? (
          <div className="otp-button-group">
            <button className="btn send-btn" onClick={sendOTP}>
              Send OTP
            </button>
            <button className="btn validate-btn" onClick={validateOTP}>
              Validate OTP
            </button>
          </div>
        ) : null}

        {isOTPvalidated ? (
          <div className="email-container">
            <input
              type="password"
              placeholder="Enter your new password"
              className="email-input"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        ) : null}

        {/* Reset Password Button (You will control visibility) */}
        {isOTPvalidated ? (
          <button className="btn reset-btn full-width" onClick={resetPassword}>
            Reset Password
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OTPPage;
