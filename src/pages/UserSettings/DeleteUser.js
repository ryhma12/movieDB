import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";

const DeleteUser = () => {
  const { user } = useUser();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const { deleteAccount, error, isLoading } = useDeleteAccount();

  const handleDelete = () => {
    deleteAccount(user.Email, password, user.id);
  };
  return (
    <div className="DeleteUser">
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
      <span className="warning">
        Warning! This action is irreversible and cannot be undone. All your
        data, including personal information, settings, and preferences, will be
        permanently lost.
      </span>
      <div className="btn--container">
        <button className="delete" onClick={handleDelete}>
          Delete User
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
