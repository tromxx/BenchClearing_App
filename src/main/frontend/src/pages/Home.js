import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Doosan from "../images/Doosan.png"
import SSG from "../images/SSG.png"
import Hamhwa from "../images/Hanhwa.png"
import Heroes from "../images/Heroes.png"
import KIA from "../images/KIA.png"
import KT from "../images/KT.png"
import LG from "../images/LG.png"
import NC from "../images/NC.png"
import Samsung from "../images/Samsung.png"
import Lotte from "../images/Lotte.png"
import AxiosApi from "../Api/AxiosApi";
import SimpleSlider from "../components/Slick";
import HomeNewsContainer from "../components/HomeNewsContainer"

const Homeblock = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1500px;
  height: 1200px;
  margin-top: 50px;
`;

const DesktopHomeBlock = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 175px 100px 0;
`;

const NoticeBlock = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    top: 250px;
    left: 10px;
    border: 1px solid transparent;
    

    table {
      width: 80vw;
      left: 25px;
      right: 25px;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 440px;
  min-width: 440px;
  height: 600px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  position: relative;

  table {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
    position: absolute;
    top: -90px;
    left: 25px;
    right: 25px;
    

    th {
      border-bottom: 1px solid #c6c6c6;
    }
    
    tr {
      height: 30px;
      
    }
    .view:hover {
        cursor: pointer;
        color: navy;
      }

    td {
      border-bottom: 1px solid #c6c6c6;
    }
    .name {
      padding: 25px;
      color: #395144;
    }

  }
`;

const WeeklyLineup = styled.div`
  
  @media (min-width: 768px) {
    width: 600px;
    height: 600px;
    border: 1px solid #c6c6c6;
    border-radius: 8px;
    margin-left: 100px;
    
    position: relative;
  }
`;

const TeamShortcut = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
  margin-top: 20px;
  .image {
    width: 90px;
    height: 65px;
    margin-right: 2vw;
  }
`;

const TeamShortcutContainer = styled.div`
  display: inline-block;

  .teamshort {
    font-family: 'Inter', sans-serif;
    transform: skew(-10deg);
    color: #395144;
    margin-left: 160px;
    margin-top: 50px;
  }
`;

const TeamShortcutContainerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MobileHomeBlock = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`;

const NewsContainerContainerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 70px;

  @media(max-width:768px) {
    position: absolute;
    left: -50px;
    top: 900px;
  }

  h2 {
    color: #395144;
  }
`;

const NewsContainerContainer = styled.div`
  display: inline-block;
`;

const NewsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 30px;
  margin-top: 20px;
  flex-wrap: wrap;
  
`;

const LeftNewsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const RightNewsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  const [latestBoard, setLatestBoard] = useState();
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getLatestBoard = async() =>{
      const rsp = await AxiosApi.getLatestBoard("All");
      if(rsp.status === 200) setLatestBoard(rsp.data);
    }
    const getShortDetailNews = async () => {
      const rsp = await AxiosApi.getShortDetailNews("All" , 1);
      if (rsp.status === 200) setNews(rsp.data);
    }
    getShortDetailNews();
    getLatestBoard();

    
  },[])
    const getTheValue = (id) => {
      navigate("/homeplate/View",{state:{id:id}});
    }


  // 뉴스를 좌우로 분할
  const splitNews = (news) => {
    const midIndex = Math.ceil(news.length / 2);
    const leftNews = news.slice(0, midIndex);
    const rightNews = news.slice(midIndex);
    return [leftNews, rightNews];
  };

  const [leftNews, rightNews] = splitNews(news);

     return (
        <Homeblock>
            <DesktopHomeBlock>
                <Container>
                  <WeeklyLineup>
                    <SimpleSlider>

                    </SimpleSlider>
                  </WeeklyLineup>
                  <NoticeBlock>

                        <div className="noticeNew">
                            
                            <table>
                              <thead>
                                <tr>
                                  <th colSpan="2" className="name"><h2 className="newsName">홈플레이트 최신글</h2></th>
                                </tr>
                              </thead>
                              <tbody>
                              {latestBoard && latestBoard.map((latestBoard) => {
                                return (
                                  <tr key={latestBoard.boardNo} className="view">
                                    <th onClick = {() => {getTheValue(latestBoard.boardNo)}}>{latestBoard.boardTitle}</th>
                                    <th>{latestBoard.nickName}</th>
                                  </tr>
                                );
                              })}
                              </tbody>
                            </table>                            
                        </div>
                  </NoticeBlock>
                </Container>
                <NewsContainerContainerContainer>
                  <NewsContainerContainer>
                  <h2>오늘의 최신뉴스</h2>
                    <NewsContainer>
                      
                        <LeftNewsBlock>
                          {leftNews.map((newsItem) => (
                            <HomeNewsContainer
                              key={newsItem.news_No}
                              exp={{
                                news_No: newsItem.news_No,
                                news_Title: newsItem.news_Title,
                                news_Image_Url: newsItem.news_Image_Url,
                                news_Short_Content: newsItem.news_Short_Content,
                              }}
                            />
                          ))}
                        </LeftNewsBlock>
                        <RightNewsBlock>
                          {rightNews.map((newsItem) => (
                            <HomeNewsContainer
                              key={newsItem.news_No}
                              exp={{
                                news_No: newsItem.news_No,
                                news_Title: newsItem.news_Title,
                                news_Image_Url: newsItem.news_Image_Url,
                                news_Short_Content: newsItem.news_Short_Content,
                              }}
                            />
                          ))}
                        </RightNewsBlock>
                      </NewsContainer>
                    </NewsContainerContainer>
                </NewsContainerContainerContainer>

                <TeamShortcutContainerContainer>
                  <TeamShortcutContainer>
                    <h2 className="teamshort">TEAM PAGE SHORTCUT</h2>
                    <TeamShortcut>
                        <a href="https://www.ssglanders.com/main" ><img src={SSG} alt="" className="image" /></a>
                        <a href="http://www.heroesbaseball.co.kr/index.do" ><img src={Heroes} alt="" className="image" /></a>
                        <a href="https://www.lgtwins.com/service/html.ncd?view=/pc_twins/twins_main/twins_main" ><img src={LG} alt="" className="image" /></a>
                        <a href="https://www.ktwiz.co.kr/sports/site/baseball/main.do" ><img src={KT} alt="" className="image" /></a>
                        <a href="https://tigers.co.kr/" ><img src={KIA} alt="" className="image" /></a>
                        <a href="https://www.ncdinos.com/" ><img src={NC} alt="" className="image" /></a>
                        <a href="http://www.samsunglions.com/" ><img src={Samsung} alt="" className="image" /></a>
                        <a href="https://www.giantsclub.com/html/index.asp?" ><img src={Lotte} alt="" className="image" /></a>
                        <a href="https://www.doosanbears.com/" ><img src={Doosan} alt="" className="image" /></a>
                        <a href="https://www.hanwhaeagles.co.kr/index.do" ><img src={Hamhwa} alt="" className="image" /></a>
                    </TeamShortcut>
                  </TeamShortcutContainer>
                </TeamShortcutContainerContainer>
            </DesktopHomeBlock>

            <MobileHomeBlock>
              <NoticeBlock>
                  <div className="noticeNew">
                    <table>
                      <thead>
                        <tr>
                          <th colSpan="2"><h2>홈플레이트 최신글</h2></th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestBoard && latestBoard.map((latestBoard) => {
                          return (
                            <tr key={latestBoard.boardNo} className="board">
                              <th onClick = {() => {getTheValue(latestBoard.boardNo)}}>{latestBoard.boardTitle}</th>
                              <th>{latestBoard.nickName}</th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>                            
                  </div>
              </NoticeBlock>
              <NewsContainerContainerContainer>
                  <NewsContainerContainer>
                  <h2>오늘의 최신뉴스</h2>
                    <NewsContainer>
                      
                        <LeftNewsBlock>
                          {leftNews.map((newsItem) => (
                            <HomeNewsContainer
                              key={newsItem.news_No}
                              exp={{
                                news_No: newsItem.news_No,
                                news_Title: newsItem.news_Title,
                                news_Image_Url: newsItem.news_Image_Url,
                                news_Short_Content: newsItem.news_Short_Content,
                              }}
                            />
                          ))}
                        </LeftNewsBlock>
                        <RightNewsBlock>
                          {rightNews.map((newsItem) => (
                            <HomeNewsContainer
                              key={newsItem.news_No}
                              exp={{
                                news_No: newsItem.news_No,
                                news_Title: newsItem.news_Title,
                                news_Image_Url: newsItem.news_Image_Url,
                                news_Short_Content: newsItem.news_Short_Content,
                              }}
                            />
                          ))}
                        </RightNewsBlock>
                      </NewsContainer>
                    </NewsContainerContainer>
                </NewsContainerContainerContainer>
              
            </MobileHomeBlock>
        </Homeblock>
    )
}
export default Home;