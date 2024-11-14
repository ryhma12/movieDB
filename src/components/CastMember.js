import RoundPhoto from "./RoundPhoto";

const CastMember = ({ member }) => {
  return (
    <div className="CastMember">
      <RoundPhoto path={member.profile_path} />
      <div className="text--container">
        <h2>{member.name}</h2>
        <span>{member.character}</span>
      </div>
    </div>
  );
};

export default CastMember;
