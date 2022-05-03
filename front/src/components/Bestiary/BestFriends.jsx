import styled from "styled-components";
import { useEffect, useState } from "react";
import * as Api from "../../api";

const BestFriends = ({ height, offset, __id }) => {
  console.log(height, offset, __id);
  const BestFriendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${height}px;
    width: auto;
    position: absolute;
    right: calc(50vw - ${offset}px);
  `;

  const LabelBf = styled.div`
    background-color: white;
  `;
  const IconBf = styled.img`
    src: ${(props) => props.src};
  `;
  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    const { data } = await Api.get(`csmdata/${__id}?top=3&bottom=0`);
    setFriends(data.payload);
  };
  useEffect(() => {
    getFriends();
    console.log(friends);
  }, []);

  return (
    <BestFriendWrapper>
      <LabelBf>최고의 궁합</LabelBf>
      {friends.map((friend, idx) => {
        return <IconBf key={`friend-${idx}`} src={friend.character.image_icon} />;
      })}
    </BestFriendWrapper>
  );
};
export default BestFriends;
