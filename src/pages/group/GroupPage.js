import { useState, useEffect } from "react";
import { useGetGroups } from "../../hooks/groups/useGetGroups";
import { useUser } from "../../hooks/useUser";

import PersonCard from "../../components/groups/PersonCard";
import Dropdown from "../../components/Dropdown";
import RoundPhoto from "../../components/RoundPhoto";

import SingleGroupView from "./SingleGroupView";
import CreateGroupForm from "../../components/groups/CreateGroupForm";

const GroupPage = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const { user } = useUser();
  const { data: groupData, getGroups, error, isLoading } = useGetGroups();

  useEffect(() => {
    const fetchGroups = async () => {
      await getGroups(user.id);
    };
    fetchGroups();
  }, [user.id, formOpen]);

  const openCreateGroupForm = () => {
    setFormOpen(!formOpen);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/group/usersofgroup?group=" + selectedGroup,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          console.log("no response");
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setUsers(data.result.map((item) => item.Name));
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [selectedGroup]);

  console.log(groupData, error);
  return (
    <div className="GroupPage">
      {!selectedGroup && (
        <div className="main--container">
          {formOpen && (
            <CreateGroupForm
              setFormOpen={setFormOpen}
              setSelectedGroup={setSelectedGroup}
            />
          )}
          <div
            className={
              formOpen ? "inner--container form--open" : "inner--container"
            }
          >
            <div className="header">
              <h2>Groups</h2>
              <div className="btn--container">
                <button onClick={openCreateGroupForm}>Create Group</button>
                <button>Browse Groups</button>
              </div>
            </div>
            {error && (
              <div className="error--container">
                <span>{error}</span>
              </div>
            )}
            {groupData && !error && (
              <div className="list--of__groups">
                {groupData.map((item, index) => (
                  <div
                    className="list--item"
                    onClick={() => setSelectedGroup(item)}
                    key={index}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {selectedGroup && (
        <SingleGroupView
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          data={groupData}
          users={users}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default GroupPage;
