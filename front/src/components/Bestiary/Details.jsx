import React from "react";
import styled from "styled-components";

const Details = ({ label, value }) => {
  return (
    <DetailWrapper>
      <Detail color="#315E44" role="label">
        {label}
      </Detail>
      <Detail color="white" role="value">
        {value}
      </Detail>
    </DetailWrapper>
  );
};

const Detail = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => (props.role === "label" ? "10rem" : "20rem")};
  color: ${(props) => (props.role === "label" ? "white" : "black")};
  z-index: ${(props) => (props.role === "label" ? "0" : "-1")};
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  padding-left: ${(props) => (props.role === "label" ? "0" : "20px")};
  margin-left: ${(props) => (props.role === "label" ? "0" : "-40px")};
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const DetailWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Details;
