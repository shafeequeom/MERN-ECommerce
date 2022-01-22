import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

import routes from "./router";

import Header from "./components/nav/Header";

import { auth } from "./utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));
  const isLoggedIn = user && user.token;
  const isAdmin = user && user.role && user.role === "admin";

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

  return useRoutes(routes(isLoggedIn, isAdmin));
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
