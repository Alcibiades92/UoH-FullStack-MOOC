import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import anecdoteReducer from "./reducers/anecdoteReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
