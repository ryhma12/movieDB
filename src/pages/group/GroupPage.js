import { useState, useEffect } from "react";
import { useGetGroups } from "../../hooks/groups/useGetGroups";
import { useUser } from "../../hooks/useUser";

import PersonCard from "../../components/groups/PersonCard";
import Dropdown from "../../components/Dropdown";
import RoundPhoto from "../../components/RoundPhoto";

const GroupPage = () => {
  const [thingOpen, setThingOpen] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const { user } = useUser();

  const handleGroupSwitch = (index) => {
    setSelectedGroup(data[index]);
    console.log("switch to group " + data[index]);
  };

  const doshit = () => {
    setThingOpen(!thingOpen);
  };

  useEffect(() => {
    const getGroups = async () => {
      try {
        console.log(user);
        if (!user) return;
        const res = await fetch(
          "http://localhost:3001/group/getgroups?id=" + user.id,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          console.log("no response");
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setData(data.result.map((item) => item.groupName));
        setSelectedGroup(data.result[0].groupName);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getGroups();
  }, [user.id]);

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

  return (
    <div className="GroupPage">
      {thingOpen && (
        <div className="add--user">
          <input type="text" />
          <div className="people--container"></div>
        </div>
      )}
      <div className="group--header">
        <Dropdown
          options={data ? data : []}
          handleSort={handleGroupSwitch}
          dropdownName={selectedGroup ? selectedGroup : data[0]}
        />
        <div className="btn--container">
          <button onClick={doshit}>Add User</button>
          <button>Settings</button>
        </div>
      </div>
      <div className="group--content">
        <div className="members--container">
          {users && users.map((name) => <PersonCard name={name} />)}
        </div>
        <div className="content--container">
          <div className="content">
            <div className="message">
              <RoundPhoto />
              <div className="text--container">
                <div className="sender">
                  <span>Matti</span>
                  <span className="time">Eilen 20.04</span>
                </div>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  id velit quasi, natus fugit fugiat! A distinctio voluptatibus
                  eligendi, similique corrupti ipsa non odit saepe eos iure ut
                  perspiciatis incidunt!
                </span>
              </div>
            </div>
          </div>
          <div className="user--input">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
