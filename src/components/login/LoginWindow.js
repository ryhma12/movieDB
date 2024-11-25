import { useState } from "react";

import { ReactComponent as CloseSVG } from "../../assets/close.svg";

const LoginWindow = ({ setShowLogin, form }) => {
  const [method, setMethod] = useState(form);
  const handleFormSwitch = () => {
    if (method === "login") {
      setMethod("register");
    } else {
      setMethod("login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "login") {
      console.log("login");
    } else {
      console.log("register");
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
          <form onSubmit={(e) => handleSubmit(e)}>
            {method === "login" ? (
              <>
                <div className="form--input__container">
                  <label>Email:</label>
                  <input type="email" required />
                </div>
                <div className="form--input__container">
                  <label>Password:</label>
                  <input type="password" required />
                </div>
              </>
            ) : (
              <>
                <div className="form--input__container">
                  <label>Name:</label>
                  <input type="text" required />
                </div>
                <div className="form--input__container">
                  <label>Email:</label>
                  <input type="email" required />
                </div>
                <div className="form--input__container">
                  <label>Password:</label>
                  <input type="password" required />
                </div>
                <div className="form--input__container">
                  <label>Password again:</label>
                  <input type="password" required />
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
