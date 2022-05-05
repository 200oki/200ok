import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const BestFriendWrapper = styled.div`
  display: flex;
  border: 5px solid #315e44;
  border-radius: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(${(props) => props.height}px - 10px);
  width: 200px;
  position: absolute;
  right: calc(50vw - ${(props) => props.offset}px);
  background-color: rgb(75, 144, 104, 0.5);
`;

const LabelBf = styled.div`
  color: #4c191b;
  font-size: 1.4rem;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`;
const IconBf = styled.img`
  cursor: pointer;
  src: ${(props) => props.src};
  transition: all;
  &:hover {
    transform: rotate(20deg);
  }
`;
export default BestFriends;
