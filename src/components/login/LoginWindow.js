import { useState } from "react";

import { ReactComponent as CloseSVG } from "../../assets/close.svg";
import { clear } from "@testing-library/user-event/dist/clear";

const LoginWindow = ({ setShowLogin, form }) => {
  const [method, setMethod] = useState(form);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");

  const clearFields = () => {
    setName("");
    setPassword("");
    setVerifyPassword("");
    setEmail("");
  };

  const handleFormSwitch = () => {
    clearFields();
    setMethod(method === "login" ? "register" : "login");
  };

  const closeWindow = () => {
    clearFields();
    setShowLogin({ open: false, method: method });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (method === "login") {
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });
      const data = await res.json();
      closeWindow();
      console.log(data);
    } else {
      const res = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Password: password,
          Email: email,
        }),
      });
      const data = await res.json();
      closeWindow();
      console.log(data);
    }
  };

  return (
    <div className="form--window__container active">
      <div className="form--window__inner">
        <section className="form--window active">
          <div className="contact--form__header">
            <div className="contact--option">
              <span>{method === "login" ? "Login" : "Register"}</span>
            </div>
            <CloseSVG onClick={() => setShowLogin(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            {method === "login" ? (
              <>
                <div className="form--input__container">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form--input__container">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form--input__container">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form--input__container">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form--input__container">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form--input__container">
                  <label>Password again:</label>
                  <input
                    type="password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="form--footer">
              <span>
                {method === "login" ? (
                  <>
                    No account? <b onClick={handleFormSwitch}>Register here.</b>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <b onClick={handleFormSwitch}>Login.</b>
                  </>
                )}
              </span>
              <button className="send--button">
                <span>{method === "login" ? "Login" : "Register"}</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginWindow;
