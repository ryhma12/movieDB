import RoundPhoto from "../RoundPhoto";

const PersonCard = ({ name, invite }) => {
  return (
    <div className="PersonCard">
      <div className="person">
        <RoundPhoto />
        <h2>{name}</h2>
      </div>
      {invite && <button>Invite</button>}
    </div>
  );
};

export default PersonCard;
