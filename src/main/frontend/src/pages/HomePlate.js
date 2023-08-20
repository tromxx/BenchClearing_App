import React, { useEffect, useState, useCallback, useContext } from "react";
import AxiosApi from "../Api/AxiosApi";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import { useNavigate} from "react-router-dom";
import Pageination from "../utils/Pagination";
import HomePlateNavi from "../components/HomePlateNavi";
import HomePlateContainer from "../components/HomePlateContainer";
import Modal from "../utils/Modal";

const BoardBlock = styled.div`
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
  .Board {
    font-family: 'inter';
    font-size: 45px;
    transform: skew(-10deg);
    color: #395144;
  }
`;

const BoardTable = styled.table`
  width: 1300px;
  height: auto;
  border-radius: 8px;
  border-collapse: collapse;
  padding: 30px;
  font-family: 'Noto Sans KR', sans-serif;

  tr {
    border-bottom: 5px solid #395144;
  }

  thead {
    font-size: 20px;
    font-weight: bold;
    background-color: #395144;
    color: #f0ebce;
  }

  tbody tr:last-child {
    border: none;
  }
  .tr-with-margin {
    margin-top: 100px;
    text-align: center;
    font-size: 24px;
  }
  tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 250px;
  font-family: 'Noto Sans KR', sans-serif;
  button{
    width: 120px;
    height: 60px;
    font-size: 15px;
    font-weight: bold;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: #395144;
    color: #F0EBCE;
    cursor: pointer;
    &:hover{
         background-color: #704F4F;
    }
  }
  button:hover{
    background-color: #395144;
  }
`;

const HomePlate = () => {
  const [board, setBoard] = useState([]);
  const [category, setCategory] = useState('All');
  const [totalData, setTotlaData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isLoggedIn } = context;
  const [modalOpen, setModalopen] = useState(false);
  
  useEffect(() => {
    const getShortDetailNews = async () => {
      const rsp = await AxiosApi.getBoard(category ,currentPage);
      if (rsp.status === 200) setBoard(rsp.data);
    }
    getShortDetailNews();
  }, [category, currentPage]);

  useEffect(() => {
    const getNewsPages = async () => {
      const rsp = await AxiosApi.getBoardPage(category);
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
  },[]);

  const checkIfLoggedIn = () => {
    if(!isLoggedIn){
      setModalopen(true);
    }else{
        navigate("/homeplate/Write");
      }
    }

  const closeModal = () => {
    setModalopen(false);
  }

  const confirmModel = () =>{
    navigate("/login")
  }

return (
    <BoardBlock>
      <h1 className="Board">HOMEPLATE</h1>
      <HomePlateNavi category={category} onSelect={onSelect} onEnter={onEnter}/>
      <BoardTable>
        <thead>
          <tr>
            <th>보드 번호</th>
            <th colSpan={3}>글 제목</th>
            <th>글 쓴이</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
        {board.length === 0 ? (
          <tr className="tr-with-margin">
            <td colSpan={6}>{`${category}와 일치하는 검색결과는 없습니다.`}</td>
          </tr>
          ) : (
          board.map((boardItem) => (
          <HomePlateContainer
            key={boardItem.boardNo}
              exp={{
                boardNo: boardItem.boardNo,
                boardTitle: boardItem.boardTitle,
                nickName: boardItem.nickName,
                boardDate: boardItem.boardDate
            }}
          />
        ))
      )}
      </tbody>
      </BoardTable>
      <FooterDiv>
      <div className="empty"></div>
      <Pageination 
        postperpage={20}
        currentPage={currentPage} 
        totalData={totalData} 
        setCurrentPage={setCurrentPage} 
        maxPageNumberLimit={maxPageNumberLimit} 
        minPageNumberLimit={minPageNumberLimit} 
        setMaxPageNumberLimit={setMaxPageNumberLimit} 
        setMinPageNumberLimit={setMinPageNumberLimit}/>
        <button onClick={checkIfLoggedIn}>글쓰기</button>
        </FooterDiv>
        <Modal 
          type={"asd"}
          confirm={confirmModel} 
          open={modalOpen} 
          close={closeModal} 
          header="BENCH CLEARING">로그인 필요</Modal>
    </BoardBlock>
    

  )
};
  
  export default HomePlate;
  