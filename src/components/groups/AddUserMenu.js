import { ReactComponent as CloseSVG } from "../../assets/close.svg";
import { useGetUsers } from "../../hooks/groups/useGetUsers";
import { useEffect } from "react";
import { useState } from "react";
import RoundPhoto from "../RoundPhoto";

import { useRefuseOrCancel } from "../../hooks/groups/useRefuseOrCancel";

const AddUserMenu = ({
  setAddUserMenuOpen,
  currentUserIsAdmin,
  allUsers,
  user,
  selectedGroup,
}) => {
  const { getUsers, data } = useGetUsers();
  const [displayUsers, setDisplayUsers] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([]);
  const { refuseOrCancel, error: cancelError } = useRefuseOrCancel();

  useEffect(() => {
    const handleFetch = async () => {
      await getUsers();
    };
    handleFetch();
  }, [getUsers]);

  useEffect(() => {
    const filtered = allUsers.filter(
      (item) => item.is_admin === false && item.is_user === false
    );
    setPendingRequests(filtered);
  }, [allUsers, user.Email]);

  const handleAccept = async () => {};

  const handleRefuse = async (item) => {
    console.log(selectedGroup);
    await refuseOrCancel(item.Name, selectedGroup, user.token);
  };

  const handleInvite = () => {};

  return (
    <div className="AddUserMenu">
      <div className="user--menu__nav">
        <div
          className={displayUsers ? "nav--button active" : "nav--button"}
          onClick={() => setDisplayUsers(true)}
        >
          <span>Search users</span>
        </div>
        {currentUserIsAdmin && (
          <div
            className={displayUsers ? "nav--button" : "nav--button active"}
            onClick={() => setDisplayUsers(false)}
          >
            <span>Requests</span>
          </div>
        )}
      </div>
      <div className="content--container">
        {displayUsers && (
          <>
            <div className="header">
              <h2>Search for users</h2>
              <CloseSVG onClick={() => setAddUserMenuOpen(false)} />
            </div>
            <input type="text" />
            <div className="people--container">
              {data &&
                data.map((item, index) => (
                  <div className="PersonCard" key={index}>
                    <div className="person">
                      <RoundPhoto />
                      <h2>{item.Name}</h2>
                    </div>
                    <div>
                      <button onClick={handleInvite}>Invite</button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
        {!displayUsers && (
          <>
            <div className="header">
              <h2>Pending Requests</h2>
              <CloseSVG onClick={() => setAddUserMenuOpen(false)} />
            </div>
            <div className="people--container">
              {pendingRequests &&
                pendingRequests.map((item, index) => (
                  <div className="PersonCard" key={index}>
                    <div className="person">
                      <RoundPhoto />
                      <h2>{item.Name}</h2>
                    </div>
                    <div className="button--container">
                      <button onClick={handleAccept}>Accept</button>
                      <button onClick={() => handleRefuse(item)}>Refuse</button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUserMenu;
