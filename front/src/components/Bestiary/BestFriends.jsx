import styled from "styled-components";
import { useEffect, useState } from "react";
import * as Api from "../../api";

const BestFriendWrapper = styled.div`
  display: flex;
  border: 5px solid black;
  border-radius: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height}px;
  width: auto;
  position: absolute;
  right: calc(50vw - ${(props) => props.offset}px);
`;

const LabelBf = styled.div`
  color: #543627;
  font-size: 1.2rem;
`;
const IconBf = styled.img`
  src: ${(props) => props.src};
`;

const BestFriends = ({ __id }) => {
  const [friends, setFriends] = useState([]);
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);

  const getFriends = async () => {
    const { data } = await Api.get(`csmdata/${__id}?top=3&bottom=0`);
    setFriends(data.payload);
  };
  useEffect(() => {
    getFriends();
    setHeight(document.getElementById("img-bubble").clientHeight);
    setOffset(document.getElementById("columnWrapper").clientWidth / 2);
  }, []);

  return (
    <BestFriendWrapper height={height} offset={offset}>
      <LabelBf>최고의 궁합</LabelBf>
      {friends.map((friend, idx) => {
        return <IconBf key={`friend-${idx}`} src={friend.character.image_icon} />;
      })}
    </BestFriendWrapper>
  );
};
export default BestFriends;
