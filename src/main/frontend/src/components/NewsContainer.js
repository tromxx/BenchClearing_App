import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NewsBlock = styled.div`
  width: auto;
  height: auto;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 10px 10px 10px rgb(180, 180, 180);
  border-radius: 8px;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    box-shadow: 15px 15px 15px rgb(200, 200, 200);
  }

  @media(max-width: 768px) {
    width: 400px;
    height: 40px;
    box-shadow: none;
    background-color: transparent;
    &:hover {
    transform: scale(1.00);
    cursor: pointer;
    box-shadow: none;
    left: 20px;
  }

  p {
    display: none;
  }
  }
`;


const Images = styled.img`
  width: 200px; 
  height: 120px; 
  margin: 10px;
  object-fit: cover;

  @media(max-width: 768px)  {
    display: none;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0px;
  h2 {
    display: inline-block;
    position: relative;
    margin: 10px 0px;
  }

  @media(max-width: 768px) {
    h2 {
      font-size: 15px;
      position: absolute;
      left: 20px;
    }
  }
`;

const NewsContainer = (props) => {
  const navigate = useNavigate();
  
  const getTheValue = (id) => {
    navigate(`/newshome/${id}`);
  };
  
  return (
    <NewsBlock onClick={()=>{getTheValue(props.exp.news_No)}}>
      <Images
        src={props.exp.news_Image_Url}
        alt="Error"
      />
      <Text>
        <h2>{props.exp.news_Title}</h2>
        <p>{props.exp.news_Short_Content}</p>
      </Text>
    </NewsBlock>
  );
};

export default NewsContainer;
