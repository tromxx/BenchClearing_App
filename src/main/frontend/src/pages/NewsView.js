import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../Api/AxiosApi";
import NewsDetailContainer from "../components/NewsDetailContainer";
import NewsLikeDisLikeContainer from "../components/NewsLikeDislikeContainer";
import NewsCommentConatiner from "../components/NewsCommnetContainer";

const NewsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 100px;
  width: auto;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;

  .News {
    font-family: 'inter';
    font-size: 45px;
    transform: skew(-10deg);
    color: #395144;
  }
`;

const NewsGrey = styled.div`
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
`;

const NewsViewNavi = styled.div`
  display: flex;
  list-style: none;
  gap: 80px;
  font-size: 25px;
  font-weight: bold;
  color: #395144;
  cursor: pointer;

  li:hover {
    color: #704F4F;
  }
`;

const NewsView = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [news, setNews] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      const response = await AxiosApi.getLongDetailNews(id);
      if (response.status === 200){
        setNews(response.data);
      }
    };
    fetchNews();
  }, []);

  const goBacktoNews = () => {
    navigate("/newshome");
  };

  return (
    <NewsBlock>
      <h1 className="News">NEWS</h1>
        <NewsGrey>
          {news && 
            <NewsDetailContainer
              exp={{
                news_Title : news.news_Title,
                news_Image_Url : news.news_Image_Url,
                news_Long_Content : news.news_Long_Content
              }}
            />

          }
          <NewsViewNavi>
            <li onClick={goBacktoNews}>목록으로 가기</li>
          </NewsViewNavi>
          <NewsLikeDisLikeContainer newsNo={id}/>
          <NewsCommentConatiner newsNo={id}/>
        </NewsGrey>
    </NewsBlock>
  );
};

export default NewsView;
