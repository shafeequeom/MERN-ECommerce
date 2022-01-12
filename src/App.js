import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Home from "./pages/Home";
import Header from "./components/nav/Header";

import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forget/password", element: <ForgetPassword /> },
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
