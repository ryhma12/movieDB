import { useUser } from "../../hooks/useUser";
import { useState } from "react";

const GeneralSettings = () => {
  const { user } = useUser();
  const [name, setName] = useState(user.Name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);

  const handleReset = () => {
    setName(user.Name);
    setPassword("");
    setEmail(user.Email);
  };

  return (
    <div className="GeneralSettings">
      <div className="input--container">
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input--container">
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input--container">
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="btn--container">
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
        <button className="submit">Save</button>
      </div>
    </div>
  );
};

export default GeneralSettings;
