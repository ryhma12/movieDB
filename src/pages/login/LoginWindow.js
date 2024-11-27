import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import { ReactComponent as CloseSVG } from "../../assets/close.svg";

const LoginWindow = ({ form }) => {
  const [method, setMethod] = useState(form);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const clearFields = () => {
    setName("");
    setPassword("");
    setVerifyPassword("");
    setEmail("");
  };

  const closeWindow = () => {
    clearFields();
    navigate("/");
  };

  useEffect(() => {
    setMethod(form);
    clearFields();
  }, [form]);

  return (
    <div className="form--window__container active">
      <div className="form--window__inner">
        <section className="form--window active">
          <div className="contact--form__header">
            <div className="contact--option">
              <span>{method === "login" ? "Login" : "Register"}</span>
            </div>
            <CloseSVG onClick={() => navigate("/")} />
          </div>
          {method === "login" ? (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              closeWindow={closeWindow}
            />
          ) : (
            <Register
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              verifyPassword={verifyPassword}
              setVerifyPassword={setVerifyPassword}
              closeWindow={closeWindow}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default LoginWindow;
