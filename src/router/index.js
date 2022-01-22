import Redirection from "../components/redirect/Redirection";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Home from "../pages/Home";

import History from "../pages/user/History";
import Password from "../pages/user/Password";
import Wishlist from "../pages/user/Wishlist";

import AdminDashboard from "../pages/admin/AdminDashboard";

const routes = (isLoggedIn, isAdmin) => [
  //Auth
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget/password", element: <ForgetPassword /> },
  { path: "/register/complete", element: <RegisterComplete /> },

  //User
  {
    path: "/user/history",
    element: isLoggedIn ? <History /> : <Redirection />,
  },
  {
    path: "/user/password",
    element: isLoggedIn ? <Password /> : <Redirection />,
  },
  {
    path: "/user/wishlist",
    element: isLoggedIn ? <Wishlist /> : <Redirection />,
  },

  //admin
  {
    path: "/admin/dashboard",
    element: isLoggedIn && isAdmin ? <AdminDashboard /> : <Redirection />,
  },
];

export default routes;
