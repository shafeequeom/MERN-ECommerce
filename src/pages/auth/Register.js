import { useState } from "react";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  //   const errorLog = () => {
  //     console.log(process.env);
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email sent to ${email}, please click the link to comnplete registration`
    );

    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        className="form-control"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-raised" type="submit">
        {" "}
        Register -- {email}
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
