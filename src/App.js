import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider, provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import Header from "./components/nav/Header";

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/register/complete", element: <RegisterComplete /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
        <ToastContainer />
        <App />
      </Router>
    </Provider>
  );
};

export default AppWrapper;
