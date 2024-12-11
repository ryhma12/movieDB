import { useState } from "react";
import { useCreateGroup } from "../../hooks/groups/useCreateGroup";
import { useUser } from "../../hooks/useUser";

const CreateGroupForm = ({ setFormOpen }) => {
  const [groupName, setGroupName] = useState("");
  const { user } = useUser();
  const { createGroup, data, error } = useCreateGroup();

  const handleCreateGroup = async () => {
    if (!user) return;

    await createGroup(user.Name, user.Email, groupName, user.token);
    setFormOpen(false);
  };

  return (
    <div className="CreateGroupForm">
      <div className="input--container">
        <label>Name: </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <div className="btn--container">
        <button className="submit" onClick={handleCreateGroup}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupForm;
