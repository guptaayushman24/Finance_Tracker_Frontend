import HomePage from "./component/HomePage";
import SigninComponent from "./component/SigninComponent";
import Signup from "./component/SignupComponent";
import { BrowserRouter, Route,Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/sigin" element={<SigninComponent></SigninComponent>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
