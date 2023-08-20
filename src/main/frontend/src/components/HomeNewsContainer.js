import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NewsBlock = styled.div`
  width: 450px;
  height: 20px;
  margin-bottom: 10px;
  display: flex;
  &:hover {
    color: navy;
    cursor: pointer;
   
  }

  @media(max-width: 768px){
    width: 400px;
    height: 40px;
    margin-left: -50px;
  }
`;




const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  h2 {
    display: inline-block;
    
    
  }
`;

const NewsContainer = (props) => {
  const navigate = useNavigate();
  
  const getTheValue = (id) => {
    console.log(id);
    navigate("/newshome/View",{state:{id:id}});
  };
  
  return (
    <NewsBlock>
      
      <Text onClick={()=>{getTheValue(props.exp.news_No)}}>
        <h4>{props.exp.news_Title}</h4>
        
      </Text>
    </NewsBlock>
  );
};

export default NewsContainer;
