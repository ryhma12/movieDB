import { ReactComponent as CloseSVG } from "../../assets/close.svg";
import { useGetUsers } from "../../hooks/groups/useGetUsers";
import { useEffect } from "react";
import PersonCard from "./PersonCard";

const AddUserMenu = ({ setAddUserMenuOpen }) => {
  const { getUsers, data } = useGetUsers();

  useEffect(() => {
    const handleFetch = async () => {
      await getUsers();
    };
    handleFetch();
  }, [getUsers]);

  return (
    <div className="AddUserMenu">
      <div className="header">
        <h2>Search for users</h2>
        <CloseSVG onClick={() => setAddUserMenuOpen(false)} />
      </div>
      <input type="text" />
      <div className="people--container">
        {data &&
          data.map((item, index) => (
            <PersonCard key={index} name={item.Name} invite={true} />
          ))}
      </div>
    </div>
  );
};

export default AddUserMenu;
