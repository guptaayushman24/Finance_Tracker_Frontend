import "../css/HomePage.css";
import HomePageLogo from "../assets/Home_Page_Logo.jpeg";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();

  function routeToSignup() {
    navigate("/signup");
  }

  function routeToSignin(){
    navigate("/signin")
  }
  return (
    <div className="homepage-wrapper">
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Section */}

          <div className="col-md-7 d-flex justify-content-center align-items-center right-section">
            <img
              src={HomePageLogo}
              alt="Finance Tracker Illustration"
              className="homepage-image img-fluid"
            />
          </div>

          {/* Right Section */}

          <div className="col-md-5 d-flex flex-column justify-content-center align-items-start left-section">
            <h1 className="app-title mb-3">Finance Tracker</h1>

            <p className="app-subtitle mb-4">
              Track your expenses, manage your savings, and control your
              financial future effortlessly.
            </p>

            <div className="login-signup-button">
              <div className="button-group rounded-pill">
                <button
                  className="btn btn-primary custom-btn mb-3"
                  onClick={routeToSignup}
                >
                  Sign Up
                </button>
              </div>

              <div className="button-group rounded-pill">
                <button className="btn btn-primary custom-btn mb-3"
                  onClick={routeToSignin}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
