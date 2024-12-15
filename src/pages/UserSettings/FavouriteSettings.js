import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";

const FavouriteSettings = () => {
  const { user } = useUser();
  const [isPublic, setIsPublic] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPublicStatus();
    }
  }, [user]);

  useEffect(() => {
    if (isPublic !== null) {
      setIsChecked(isPublic);
    }
  }, [isPublic]);

  const fetchPublicStatus = async () => {
    try {
      if (!user) throw new Error("User not logged in.");
      const res = await fetch(
        "http://localhost:3001/user/favourites/status/get",
        {
          headers: { Authorization: user.token },
        }
      );
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      if (data.isPublic === null || data.isPublic === undefined) {
        throw new Error("Public status not found");
      }
      setIsPublic(data.isPublic);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) throw new Error("User not logged in.");
      if (isPublic === isChecked) {
        return;
      }

      const res = await fetch(
        "http://localhost:3001/user/favourites/status/put",
        {
          method: "PUT",
          headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPublic: isChecked }),
        }
      );

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      fetchPublicStatus();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="favourite-settings">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input className="check-btn" type="checkbox" checked={isChecked} onChange={handleToggle} />
          {isChecked ? "Public favourites On" : "Public favourites Off"}
        </label>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FavouriteSettings;
