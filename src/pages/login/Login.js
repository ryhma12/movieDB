import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Loading from "../../components/utility/Loading";

const Login = ({ email, setEmail, password, setPassword, closeWindow }) => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    closeWindow();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="form--footer">
        <span>
          No account?{" "}
          <b onClick={() => navigate("/register")}>Register here.</b>
        </span>
        <button className="send--button">
          <span>{isLoading ? <Loading /> : "Login"}</span>
        </button>
      </div>
    </form>
  );
};

export default Login;
