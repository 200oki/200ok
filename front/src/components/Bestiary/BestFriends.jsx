import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BestFriendWrapper = styled.div`
  display: flex;
  border: 5px solid #00527a;
  border-radius: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(${(props) => props.height}px - 10px);
  width: 200px;
  position: absolute;
  right: calc(50vw - ${(props) => props.offset}px);
  background-color: rgb(160, 220, 248, 0.5);
`;

const LabelBf = styled.div`
  color: #4c191b;
  font-size: 1.2rem;
`;
const IconBf = styled.img`
  cursor: pointer;
  src: ${(props) => props.src};
  transition: all;
  &:hover {
    transform: rotate(20deg);
  }
`;

const BestFriends = ({ friends }) => {
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setHeight(document.getElementById("img-bubble")?.clientHeight);
    setOffset(document.getElementById("columnWrapper")?.clientWidth / 2);
  }, [height]);

  return (
    <BestFriendWrapper height={height} offset={offset}>
      <LabelBf>최고의 궁합</LabelBf>
      {friends.map((friend, idx) => {
        return (
          <IconBf
            key={`friend-${idx}`}
            src={friend.character.image_icon}
            onClick={() => {
              navigate(`/detail/${friend.id}`);
            }}
          />
        );
      })}
    </BestFriendWrapper>
  );
};
export default BestFriends;
