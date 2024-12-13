import { useState, useEffect } from "react";
import { useGetGroups } from "../../hooks/groups/useGetGroups";
import { useUser } from "../../hooks/useUser";
import { useRequestToJoinGroup } from "../../hooks/groups/useRequestToJoinGroup";
import { useRefuseOrCancel } from "../../hooks/groups/useRefuseOrCancel";

import SingleGroupView from "./SingleGroupView";
import CreateGroupForm from "../../components/groups/CreateGroupForm";

const GroupPage = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [browseAllGroups, setBrowseAllGroups] = useState(false);
  const [buttonText, setButtonText] = useState("Pending Approval");
  const [requestButtonText, setRequestButtonText] = useState("Request to join");
  const [cancelTrigger, setCancelTrigger] = useState(false);

  const { user } = useUser();
  const { data: groupData, getGroups, error, isLoading } = useGetGroups();
  const { requestToJoinGroup, error: requestError } = useRequestToJoinGroup();
  const { refuseOrCancel, error: cancelError } = useRefuseOrCancel();

  useEffect(() => {
    const fetchGroups = async () => {
      await getGroups(user.id, browseAllGroups);
    };
    fetchGroups();
  }, [user.id, getGroups, browseAllGroups, formOpen, cancelTrigger]);

  const openCreateGroupForm = () => {
    setFormOpen(!formOpen);
  };

  const requestToJoin = async (group) => {
    await requestToJoinGroup(user.Name, group, user.token);
    if (!requestError) setRequestButtonText("Pending Approval");
  };

  const handleCancelRequest = async (group) => {
    await refuseOrCancel(user.Name, group, user.token);
    setCancelTrigger(!cancelTrigger);
  };

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
              <h2>{!browseAllGroups ? "My Groups" : "Browse Groups"}</h2>
              <div className="btn--container">
                <button onClick={openCreateGroupForm}>Create Group</button>
                <button onClick={() => setBrowseAllGroups(!browseAllGroups)}>
                  {!browseAllGroups ? "Browse Groups" : "My Groups"}
                </button>
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
                    className={
                      !browseAllGroups ? "list--item normal" : "list--item"
                    }
                    onClick={() => {
                      !browseAllGroups &&
                        (item.is_user || item.is_admin) &&
                        setSelectedGroup(item.groupName);
                    }}
                    key={index}
                  >
                    {!browseAllGroups ? (
                      <div>
                        {item.is_user || item.is_admin ? (
                          <span>{item.groupName}</span>
                        ) : (
                          <div className="requestable">
                            <span>{item.groupName}</span>
                            <button
                              className="request--btn"
                              onClick={() =>
                                handleCancelRequest(item.groupName)
                              }
                              onMouseOver={() =>
                                setButtonText("Cancel Request")
                              }
                              onMouseLeave={() =>
                                setButtonText("Pending Approval")
                              }
                            >
                              {buttonText}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="requestable">
                        <span>{item.groupName}</span>
                        <button
                          className="request--btn"
                          onClick={() => requestToJoin(item.groupName)}
                        >
                          {requestButtonText}
                        </button>
                      </div>
                    )}
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
          user={user}
        />
      )}
    </div>
  );
};

export default GroupPage;
