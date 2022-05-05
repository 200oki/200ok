import NormalInfo from "./NormalInfo";
import SpecialInfo from "./SpecialInfo";

const Info = ({ villager }) => {
  return <div>{villager.special ? <SpecialInfo villager={villager} /> : <NormalInfo villager={villager} />}</div>;
};
export default Info;
