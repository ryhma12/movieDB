import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { useEffect } from "react";

const Register = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  verifyPassword,
  setVerifyPassword,
  closeWindow,
}) => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    signup(name, email, password);
    closeWindow();
  };

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="form--footer">
        <span>
          Already have an account?{" "}
          <b onClick={() => navigate("/login")}>Login.</b>
        </span>
        <button className="send--button">
          <span>Register</span>
        </button>
      </div>
    </form>
  );
};

export default Register;
