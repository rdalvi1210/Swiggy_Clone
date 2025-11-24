import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/redux/Store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
