import HomePage from "./component/HomePage";
import SigninComponent from "./component/SigninComponent";
import Signup from "./component/SignupComponent";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import ViewFinanceDetail from "./component/ViewFinanceDetail";
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<SigninComponent></SigninComponent>}></Route>
        <Route path="/viewfinance" element={<ViewFinanceDetail></ViewFinanceDetail>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
