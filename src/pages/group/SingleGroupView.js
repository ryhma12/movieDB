import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";

import Dropdown from "../../components/Dropdown";
import RoundPhoto from "../../components/RoundPhoto";
import TintLayer from "../../components/utility/TintLayer";
import AddUserMenu from "../../components/groups/AddUserMenu";

const SingleGroupView = ({ selectedGroup, setSelectedGroup, data, user }) => {
  const [addUserMenuOpen, setAddUserMenuOpen] = useState(false);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [acceptTrigger, setAcceptTrigger] = useState(false);
  const [users, setUsers] = useState([]);

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
        console.log(data);
        setUsers(data.result);
        data.result.forEach((item) => {
          if (item.Email === user.Email) {
            if (item.is_admin) {
              setCurrentUserIsAdmin(true);
            } else {
              setCurrentUserIsAdmin(false);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [selectedGroup, user.Email, addUserMenuOpen, acceptTrigger]);

  const handleGroupSwitch = (index) => {
    setSelectedGroup(data[index].groupName);
    console.log("switch to group " + data[index].groupName);
  };

  const openAddUserMenu = () => {
    setAddUserMenuOpen(!addUserMenuOpen);
  };

  console.log("data on ", data);
  return (
    <div className="SingleGroupView">
      {addUserMenuOpen && (
        <AddUserMenu
          setAddUserMenuOpen={setAddUserMenuOpen}
          currentUserIsAdmin={currentUserIsAdmin}
          allUsers={users}
          user={user}
          selectedGroup={selectedGroup}
          acceptTrigger={acceptTrigger}
          setAcceptTrigger={setAcceptTrigger}
        />
      )}
      {addUserMenuOpen && <TintLayer />}
      <div className="container">
        <div className="group--header">
          <Dropdown
            options={data ? data.map((group) => group.groupName) : []}
            handleSort={handleGroupSwitch}
            dropdownName={selectedGroup ? selectedGroup : data[0].groupName}
          />
          <div className="btn--container">
            <button onClick={openAddUserMenu}>Add User</button>
            <button>Settings</button>
          </div>
        </div>
        <div className="group--content">
          <div className="members--container">
            {users &&
              users.map((item, index) => (
                <>
                  {(item.is_user || item.is_admin) && (
                    <div className="PersonCard" key={index}>
                      <div className="person">
                        <RoundPhoto />
                        <h2>{item.Name}</h2>
                      </div>
                    </div>
                  )}
                </>
              ))}
            <div
              className="back--button__container"
              onClick={() => setSelectedGroup("")}
            >
              <span>Back to group lobby</span>
            </div>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi id velit quasi, natus fugit fugiat! A distinctio
                    voluptatibus eligendi, similique corrupti ipsa non odit
                    saepe eos iure ut perspiciatis incidunt!
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
    </div>
  );
};

export default SingleGroupView;
