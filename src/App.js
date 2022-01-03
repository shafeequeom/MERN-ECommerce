import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <Header></Header>
      <App />
    </Router>
  );
};

export default AppWrapper;
