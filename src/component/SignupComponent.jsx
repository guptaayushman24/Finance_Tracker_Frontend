import { useState, useEffect} from "react";
import "../css/SignupComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignupComponent() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [allExpense, setAllExpense] = useState([]);

  // State for storing the fields
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // State for displaying. error if any invalid field is filled
  const [errorFirstName, SeterrorFirstName] = useState(false);
  const [errorSecondName, SeterrorSecondName] = useState(false);
  const [errorEmailAddress, setErrorEmailAddress] = useState(false);
  const [errorPassword, SeterrorPassword] = useState(false);

  // State for the Signup Button
  const [loading, SetLoading] = useState(false);
  const [signupButton, setSignupButton] = useState("Register User");

  // Regex
  const firstNameRegex = /^[A-Za-z]+$/;
  const secondNameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Navigate
  const navigate = useNavigate();

  // Fetch expenses on page load
  useEffect(() => {
    // Replace with your real API
    const allExpenseResponse = axios.get(
      "http://localhost:8081/availableexpense",
    );
    setAllExpense(allExpenseResponse.data);
    const fetchExpenses = async () => {
      try {
        setExpenses((await allExpenseResponse).data);
      } catch (error) {
        console.log("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Handle Expense Click
  const handleExpenseClick = (expense) => {
    if (!selectedExpenses.includes(expense)) {
      setSelectedExpenses([...selectedExpenses, expense]);
    }
  };

  const removeExpense = (indexToRemove) => {
    const modifiedExpense = selectedExpenses.filter(
      (_, index) => index !== indexToRemove,
    );
    setSelectedExpenses(modifiedExpense);
  };

  const saveUser = async () => {
    SetLoading(true);
    if (firstName.length > 0 && !firstNameRegex.test(firstName)) {
      SeterrorFirstName(true);
    } else {
      SeterrorFirstName(false);
    }

    if (secondName.length > 0 && !secondNameRegex.test(secondName)) {
      SeterrorSecondName(true);
    } else {
      SeterrorSecondName(false);
    }

    if (emailAddress.length > 0 && !emailRegex.test(emailAddress)) {
      setErrorEmailAddress(true);
    } else {
      setErrorEmailAddress(false);
    }

    if (password.length > 0 && !passwordRegex.test(password)) {
      SeterrorPassword(true);
    } else {
      SeterrorPassword(false);
    }

    if (
      !errorFirstName &&
      !errorSecondName &&
      !errorPassword &&
      !errorEmailAddress
    ) {
      console.log("Hello Axios");
      await axios
        .post("http://localhost:8080/auth/signup", {
          firstName: firstName,
          lastName: secondName,
          emailAddress: emailAddress,
          password: password,
          user_expense: selectedExpenses,
        })
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);

          if (response.status == 200) {
           navigate("/signin")
          }
        });
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="signup-card">
          <h2 className="text-center mb-4">Signup Page</h2>

          <div className="nameerrorparent">
            <input
              type="text"
              placeholder="First Name"
              className="form-control custom-input"
              onChange={(e) => setFirstName(e.target.value)}
            />

            {errorFirstName ? (
              <div className="nameerror">
                *First Name should not contain digit or any special character
              </div>
            ) : null}
          </div>

          <div className="nameerrorparent">
            <input
              type="text"
              placeholder="Second Name"
              className="form-control custom-input"
              onChange={(e) => setSecondName(e.target.value)}
            />
            {errorSecondName ? (
              <div className="nameerror">
                *Last Name should not contain digit or any special character
              </div>
            ) : null}
          </div>

          <div className="nameerrorparent">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control custom-input"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            {errorEmailAddress ? (
              <div className="nameerror">*Enter valid Email Address</div>
            ) : null}
          </div>

          <div className="nameerrorparent">
            <input
              type="password"
              placeholder="Password"
              className="form-control custom-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorPassword ? (
              <div className="nameerror">
                *Password should contain atleast one capital letter and atleast
                one digit and atleast one special character and atleast length
                should be 6
              </div>
            ) : null}
          </div>

          {/* Selected Expenses */}
          {selectedExpenses.length > 0 && (
            <div className="selected-expenses mb-3">
              {selectedExpenses.map((expense, index) => (
                <span
                  key={index}
                  className="selected-tag cursor-pointer"
                  onClick={() => removeExpense(index)}
                >
                  {expense}
                </span>
              ))}
            </div>
          )}

          {/* Expense Buttons */}
          <div className="expense-buttons mb-4">
            {expenses.map((expense, index) => (
              <button
                key={index}
                className="btn btn-outline-primary expense-btn"
                onClick={() => handleExpenseClick(expense)}
              >
                {expense}
              </button>
            ))}
          </div>

          {/* <button
            className="btn btn-primary w-100 register-btn"
            onClick={saveUser}
          >
            Register User
          </button> */}
          <button
            className="btn btn-primary w-100 register-btn"
            onClick={saveUser}
            disabled={loading}
          >
            {loading ? "Registering User..." : "Register User"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignupComponent;
