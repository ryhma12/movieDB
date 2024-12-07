import RoundPhoto from "../RoundPhoto";

const PersonCard = ({ name }) => {
  return (
    <div className="PersonCard">
      <RoundPhoto />

      <h2>{name}</h2>
    </div>
  );
};

export default PersonCard;
