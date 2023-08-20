import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { storage } from '../Api/FirebaseApi';
import Modal from "../utils/Modal";
import AxiosApi from "../Api/AxiosApi";

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
   };
`;

const BoardGrey = styled.div`
   border-radius: 8px;
   margin-left: auto;
   margin-right: auto;
   width: 1200px;
   background-color: #f6f6f6;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 70px;
   padding: 40px;
   .write_header{
      display: flex;
      gap: 20px;
      width: 1000px;
      justify-content: left;
      align-items: center;
   }
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
   .input_title {
      width: 600px;
      height: 50px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 15px;
      margin-left: 20px;
      border: 1px solid #c6c6c6;
      padding-left: 8px;
   }
   .contents {
      width: 950px; 
      height: 300px; 
      padding: 10px;
      font-size: 16px;
      border-radius: 15px;
      border: 1px solid #ccc;
      resize: none;
      font-family: 'Noto Sans KR', sans-serif;
      outline: none;
   }
   .input_img{
      height: 40px;
   }
   .writeControlDiv{
      display: flex;
      justify-content: center;
      align-items:  center;
      gap: 100px;
   }
`;

const Write = () => {
   const navigate = useNavigate();
   const [boardTitle, setBoardTitle] = useState("");
   const [boardContent, setBoardContent] = useState("");
   const [modalOpen, setModalOpen] = useState(false);
   const [modalText, setModalText] = useState("작성이 완료되었습니다.");
   const [type, setType] = useState("");
   const [file, setFile] = useState(null);


    
   const closeModal = () => {
      setModalOpen(false);
   }
    
   const nav = () => {
      navigate('/homeplate');
   }

   const handleBack = () => {
      setType("open");
      setModalText("작성중인 글은 저장되지 않습니다. 목록으로 이동하시겠습니까?");
      setModalOpen(true);
   }
    
   const writeGo = async () => {
      const token = localStorage.getItem('token');
      if (boardTitle.length === 0 && boardContent.length === 0) {
         setModalOpen(true);
         setModalText("제목 없음 또는 내용 없음");
      } else {
         try {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            const data = {
               url: url,
               boardTitle: boardTitle,
               boardContent: boardContent
            };
            const response = await AxiosApi.writeBoard(data, token);
            if(response.data){
               navigate("/homeplate");
            }
         } catch (error) {
         }
      }
      if(boardTitle.length === 0 && boardContent.length === 0){
         setModalOpen(true);
         setModalText("제목 없음 또는 내용 없음");
      }else{
         try{
            const data = {
               boardTitle: boardTitle,
               boardContent: boardContent
            };
            const response = await AxiosApi.writeBoard(data, token);
            if(response.data){
               navigate("/homeplate");
            }
         }catch(error){

         }
      }
   };


   

   return(
     <BoardBlock>
        <h1 className="Board">HOMEPLATE</h1>
        <BoardGrey>
           <div className="write_header">
              <input type="text" accept="image/*" className="input_title" placeholder="제목을 입력하세요." value={boardTitle} onChange={(e)=>setBoardTitle(e.target.value)}/>
              <input type="file" accept="image/png, image/jpeg" className="input_img" onChange={(e)=>{setFile(e.target.files[0])}}/>
              <Modal open={modalOpen} type={type} close={closeModal} confirm={nav} header="BENCH CLEARING">
                 {modalText}
              </Modal>
           </div>
           <textarea className="contents" placeholder="글 내용" value={boardContent} onChange={(e)=>setBoardContent(e.target.value)}></textarea>
           <div className="writeControlDiv">
              <button  type="submit" onClick={writeGo}>작성 완료</button>
              <button onClick={handleBack}>목록 보기</button>
           </div>
        </BoardGrey>
     </BoardBlock>
   );
};

export default Write;