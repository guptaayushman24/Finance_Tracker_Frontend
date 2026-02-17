import { useNavigate } from "react-router-dom";
import "../css/SigninComponent.css";
function SigninComponent(){
  const navigate = useNavigate();
  function routeToSignup(){
    navigate("/signup");
  }
  return(
     <div className="signin-wrapper">
      <div className="signin-card">
        <h2 className="signin-title">Welcome Back 👋</h2>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-input"
          />
        </div>

        <button className="signin-btn">Sign In</button>

        <p className="signin-footer">
          Don’t have an account? <span onClick={routeToSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default SigninComponent;