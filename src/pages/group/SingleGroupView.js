import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";

import PersonCard from "../../components/groups/PersonCard";
import Dropdown from "../../components/Dropdown";
import RoundPhoto from "../../components/RoundPhoto";

const SingleGroupView = ({
  selectedGroup,
  setSelectedGroup,
  data,
  users,
  setUsers,
}) => {
  const [addUserMenuOpen, setAddUserMenuOpen] = useState(false);

  const handleGroupSwitch = (index) => {
    setSelectedGroup(data[index]);
    console.log("switch to group " + data[index]);
  };

  const openAddUserMenu = () => {
    setAddUserMenuOpen(!addUserMenuOpen);
  };
  return (
    <div className="SingleGroupView">
      {addUserMenuOpen && (
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
          <button onClick={openAddUserMenu}>Add User</button>
          <button>Settings</button>
        </div>
      </div>
      <div className="group--content">
        <div className="members--container">
          {users &&
            users.map((name, index) => <PersonCard key={index} name={name} />)}
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

export default SingleGroupView;
