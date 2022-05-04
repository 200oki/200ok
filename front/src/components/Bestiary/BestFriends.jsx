import styled from "styled-components";
import { useEffect, useState } from "react";

const BestFriendWrapper = styled.div`
  display: flex;
  border: 5px solid #00527a;
  border-radius: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height}px;
  width: auto;
  position: absolute;
  right: calc(50vw - ${(props) => props.offset}px);
  background-color: rgb(103, 158, 203, 0.5);
`;

const LabelBf = styled.div`
  color: #4c191b;
  font-size: 1.2rem;
`;
const IconBf = styled.img`
  src: ${(props) => props.src};
`;

const BestFriends = ({ friends }) => {
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setHeight(document.getElementById("img-bubble")?.clientHeight);
    setOffset(document.getElementById("columnWrapper")?.clientWidth / 2);
  }, [height]);

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
