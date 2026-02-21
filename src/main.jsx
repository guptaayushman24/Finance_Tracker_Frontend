import { StrictMode} from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </StrictMode>
)