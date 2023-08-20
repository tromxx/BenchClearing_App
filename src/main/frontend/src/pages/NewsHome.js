import React, { useCallback } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import AxiosApi from "../Api/AxiosApi";
import NewsContainer from"../components/NewsContainer";
import NewsNavi from "../components/NewsNavi";
import Pagination from "../utils/Pagination"

const NewsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  margin-bottom: 100px;
  width: auto;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  gap: 50px;
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
    width: 1300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px;
`;

const NewsHome = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('All');
  const [totalData, setTotlaData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    const getShortDetailNews = async () => {
      const rsp = await AxiosApi.getShortDetailNews(category ,currentPage);
      if (rsp.status === 200) setNews(rsp.data);
    }
    getShortDetailNews();
  }, [category, currentPage]);

  useEffect(() => {
    const getNewsPages = async () => {
      const rsp = await AxiosApi.getNewsPages(category);
      if(rsp.status===200)  setTotlaData(rsp.data);
    }
    getNewsPages();
  },[category]);

  const onSelect = useCallback(category => {
    setCategory(category);
    setCurrentPage(1);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }, []);

  const onEnter = useCallback(category =>{
      setCategory(category);
      setCurrentPage(1);
      setMaxPageNumberLimit(5);
      setMinPageNumberLimit(0);
  },[])
    
  return (
    <NewsBlock>
      <h1 className="News">NEWS</h1>
      <NewsNavi category={category} onSelect={onSelect} onEnter={onEnter}/>
      <NewsGrey>
      {news.length === 0 ? (
        <h2>{category}와 일치하는 검색결과는 없습니다.</h2>
          ) : (
          news.map((newsItem) => (
          <NewsContainer
            key={newsItem.news_No}
              exp={{
                news_No: newsItem.news_No,
                news_Title: newsItem.news_Title,
                news_Image_Url: newsItem.news_Image_Url,
                news_Short_Content: newsItem.news_Short_Content
            }}
          />
        ))
      )}
      </NewsGrey>
      <Pagination
        postperpage={10} 
        currentPage={currentPage} 
        totalData={totalData} 
        setCurrentPage={setCurrentPage} 
        maxPageNumberLimit={maxPageNumberLimit} 
        minPageNumberLimit={minPageNumberLimit} 
        setMaxPageNumberLimit={setMaxPageNumberLimit} 
        setMinPageNumberLimit={setMinPageNumberLimit}/>
    </NewsBlock>
  );
}

export default NewsHome;
  

