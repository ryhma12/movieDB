import { useState } from "react";

import GeneralSettings from "./GeneralSettings";
import DeleteUser from "./DeleteUser";
import FavouriteSettings from "./FavouriteSettings";

const UserSettings = () => {
  const [activePage, setActivePage] = useState("General");

  return (
    <div className="UserSettings">
      <div className="container">
        <h2>Settings</h2>
        <div className="settings--container">
          <div className="side--nav">
            <div onClick={() => setActivePage("General")}>
              <span>General</span>
            </div>
            <div onClick={() => setActivePage("Delete")}>
              <span>Delete Account</span>
            </div>
            <div onClick={() => setActivePage("Favourite")}>
              <span>Favourites</span>
            </div>
          </div>
          <div className="settings">
            {activePage === "General" && <GeneralSettings />}
            {activePage === "Delete" && <DeleteUser />}
            {activePage === "Favourite" && <FavouriteSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
