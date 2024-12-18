import CastMember from "./CastMember";

const CastSection = ({ cast }) => {
  return (
    <div className="CastSection">
      {cast &&
        cast.map((member) => <CastMember key={member.id} member={member} />)}
    </div>
  );
};

export default CastSection;
