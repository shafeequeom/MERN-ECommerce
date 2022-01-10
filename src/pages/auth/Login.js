import { useState } from "react";
import { Button } from "antd";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={email}
          className="form-control"
          autoFocus
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />
      <div className="form-group">
        <input
          type="password"
          name="password"
          value={password}
          className="form-control"
          autoFocus
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />
      <Button
        type="submit"
        onClick={handleSubmit}
        className="mb-3"
        block
        shape="round"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
