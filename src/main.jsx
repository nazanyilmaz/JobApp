import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import "./styles/style.scss";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
