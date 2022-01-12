import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Home from "../pages/Home";

import History from "../pages/user/History";

const routes = [
  //Auth
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget/password", element: <ForgetPassword /> },
  { path: "/register/complete", element: <RegisterComplete /> },
  //User
  { path: "/user/history", element: <History /> },
];

export default routes;
