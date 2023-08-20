import React from "react";
import styled from "styled-components";

const NewsBlock = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 40px;
    font-family: 'Noto Sans KR', sans-serif;
    .info{
      border-bottom: 1px solid black;
      padding-bottom: 20px;
      p{
        display: flex;
        justify-content: flex-end;
        margin: 0px;
      }
    }
    img{
      width: 870px;
      height: 600px;
    }
    p{
      width: 870px;
    }
`;

const NewsDetailPage = (props) => {
    return(
        <NewsBlock>
          <div className="info">
            <h1>{props.exp.news_Title}</h1>
            <p>2023/02/23</p>
          </div>  
            <img src={props.exp.news_Image_Url}alt="Error" />
            <p>{props.exp.news_Long_Content}</p>
        </NewsBlock>
    );
}

export default NewsDetailPage;