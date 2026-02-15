import { useState, useEffect } from "react";
import "../css/SignupComponent.css";
import axios from "axios";
function SignupComponent() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [allExpense,setAllExpense] = useState([]);

  // Fetch expenses on page load
  useEffect(() => {
    // Replace with your real API
    const allExpenseResponse = axios.get("http://localhost:8081/availableexpense");
    setAllExpense(allExpenseResponse.data);
    const fetchExpenses = async () => {
      try {
        // Example dummy data (remove when using real API)
        // const dataFromAPI = [
        //   "Car Payment",
        //   "Clothing",
        //   "Entertainment",
        //   "Emergency Fund",
        //   "Groceries",
        // ];

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

  return (
    <div className="signup-wrapper">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="signup-card">
          <h2 className="text-center mb-4">Signup Page</h2>

          <input
            type="text"
            placeholder="First Name"
            className="form-control custom-input mb-3"
          />

          <input
            type="text"
            placeholder="Second Name"
            className="form-control custom-input mb-3"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="form-control custom-input mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control custom-input mb-3"
          />

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

          <button className="btn btn-primary w-100 register-btn">
            Register User
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignupComponent;
