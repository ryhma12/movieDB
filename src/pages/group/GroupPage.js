import { useState } from "react";

import PersonCard from "../../components/groups/PersonCard";
import Dropdown from "../../components/Dropdown";
import RoundPhoto from "../../components/RoundPhoto";

const GroupPage = () => {
  const [thingOpen, setThingOpen] = useState(false);

  const handleGroupSwitch = (index) => {
    console.log("switch to group " + index);
  };

  const doshit = () => {
    setThingOpen(!thingOpen);
  };

  return (
    <div className="GroupPage">
      {thingOpen && (
        <div className="add--user">
          <input type="text" />
          <div className="people--container">
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
            <PersonCard name="entiiä" />
          </div>
        </div>
      )}
      <div className="group--header">
        <Dropdown options={["Ryhmä 12"]} handleSort={handleGroupSwitch} />
        <div className="btn--container">
          <button onClick={doshit}>Add User</button>
          <button>Settings</button>
        </div>
      </div>
      <div className="group--content">
        <div className="members--container">
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
          <PersonCard name="entiiä" />
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
