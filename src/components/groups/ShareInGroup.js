import { useEffect, useState } from "react";
import { useGetGroups } from "../../hooks/groups/useGetGroups";
import { useUser } from "../../hooks/useUser";
import { useSendMessage } from "../../hooks/groups/useSendMessage";

const ShareInGroup = ({ selectedMovie }) => {
  const { user } = useUser();
  const { data: groupData, getGroups, error, isLoading } = useGetGroups();
  const [buttonText, setButtonText] = useState("Share");
  const [selectedGroup, setSelectedGroup] = useState("");
  const { sendMessage } = useSendMessage();

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user?.id) return;

      await getGroups(user.id, false);
    };
    fetchGroups();
  }, [user?.id, getGroups]);

  const handleShare = async (groupName) => {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.REACT_APP_API_KEY
    }&query=${selectedMovie.original_title.replace(" ", "+")}`;
    await sendMessage(user.Name, groupName, movieUrl, user.token);
    alert("Shared in group: " + groupName);
  };

  return (
    <div className="ShareInGroup">
      <h2>Share in a group by selecting one you are in below</h2>
      {groupData && !error && (
        <div className="list--of__groups">
          {groupData.map((item, index) => (
            <div
              className={"list--item normal"}
              onClick={() => {
                (item.is_user || item.is_admin) &&
                  setSelectedGroup(item.groupName);
              }}
              key={index}
            >
              {
                <div>
                  <div className="requestable">
                    <span>{item.groupName}</span>
                    <button
                      className="request--btn"
                      onClick={() => handleShare(item.groupName)}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareInGroup;
