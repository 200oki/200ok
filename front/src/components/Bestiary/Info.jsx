import NormalInfo from "./NormalInfo";
import SpecialInfo from "./SpecialInfo";

const Info = ({ villager }) => {
  return <div>{!villager.special ? <NormalInfo villager={villager} /> : <SpecialInfo villager={villager} />}</div>;
};
export default Info;
