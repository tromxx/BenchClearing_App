import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import AxiosApi from "../Api/AxiosApi";
import styled from "styled-components";
import Logo from "../images/logo-big.png"

const Container = styled.div`
    width: 100%;
    height: 600px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
  h2 {
    position: absolute;
    top: 100px;
    margin-left: -70px;
    left: 50%;
    
  }

.sign {
    
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    letter-spacing: 0px;
    color: #313131;
    opacity: 1;
}

  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }
  .item5 {
    
    margin-top: 10px;
    margin-bottom: 10px;
    
    display: flex;
    align-items: center;

    .check {
        
        width: 80px; 
        height: auto; 
        line-height : normal; 
        padding: .8em .5em; 
        font-family: inherit; /* 폰트 상속 */
        border: 1px solid #999;
        border-radius: 18px; /* iSO 둥근모서리 제거 */
        outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
        cursor: pointer;
    }
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
  }
  /* .success {
    color: royalblue;
  }
  .error {
    color: red;
  } */

  .enable-button {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 400px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #395144;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
    cursor: pointer;
  }
  .enable-button:active {
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 400px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }

  @media(max-width:768px) {
    width: 100%;
    height: 700px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #395144;

    h2 {
    position: absolute;
    top: 200px;
    margin-bottom: 10px;
    margin-left: -70px;
    left: 50%;
    }

  .sign {
    
    font-family: 'Noto Sans KR', sans-serif;
    margin-left: 50px;
    
    
    color: #F0EBCE;
    opacity: 1;
  }

  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }
  .item5 {
    
    margin-top: 10px;
    margin-bottom: 10px;
    
    display: flex;
    align-items: center;

    .check {
        
        width: 80px; 
        height: auto; 
        line-height : normal; 
        padding: .8em .5em; 
        font-family: inherit; /* 폰트 상속 */
        border: 1px solid #999;
        border-radius: 18px; /* iSO 둥근모서리 제거 */
        outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
        cursor: pointer;
    }
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
  }
  /* .success {
    color: royalblue;
  }
  .error {
    color: red;
  } */

  .enable-button {
    
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 300px; /* 원하는 너비 설정 */
    height: 50px;
    color: black;
    background-color: #F0EBCE;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #F0EBCE;
    font-weight: 700;
    cursor: pointer;
  }
  .enable-button:active {
    
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 300px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  }
`;

const Input = styled.input`
  
  width: 400px; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */

  @media(max-width:768px) {
    width: 300px;
  }
  
`;

const Logoblock = styled.div`
    position: absolute;
    top: 50px;
    margin-left: -120px;
    left: 50%;
    
        .logo {
            width: 250px;
            height: auto;
            margin-bottom: 20px;
        }

    @media(min-width: 768px) {
      display: none;
    }
`;




const FindPw = () => {

    const navigate = useNavigate();

     // 키보드 입력
     const [inputId, setInputId] = useState("");
     
     

      // 오류 메시지
      const [idMessage, setIdMessage] = useState("");
      
      // 유효성 검사
     const [isId, setIsId] = useState(false);
     
    
        // 팝업
     const [modalOpen, setModalOpen] = useState(false);
     const [modalText, setModalText] = useState("");

     


    // 아이디(이메일) 정규식 확인
    const onChangId = (e) => {
        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
          }
        setInputId(e.target.value)
        if (!validateEmail(e.target.value)) {
            setIdMessage("이메일 형식으로 입력해주세요");
               
        } else {
            setIdMessage("올바른 형식입니다.");
            
        }
    }   

   


    const sendMail = async () => {
        try {
          console.log(inputId);
          const isSent = await AxiosApi.findPw(inputId);
          if (isSent.data === true) {
            setModalText("이메일이 전송되었습니다.");
            setModalOpen(true);
            navigate("/");
          } else if(inputId === "") {
            setModalText("아이디를 입력해주세요.");
            setModalOpen(true);
            
          } else  {
            setModalText("존재하지 않는 아이디입니다.");
            setModalOpen(true);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const closeModal = async () => {
        const isSent = await AxiosApi.findPw(inputId);
        if(isSent === true) {
            setModalOpen(false);
            navigate("/login");
        } else {
            setModalOpen(false);
        }
        
    };
      

    return(
        <Container>
        <div className="sign">
          <Logoblock>
            <Link to="/">
              <img src={Logo} alt="/" className="logo"/>
            </Link>
          </Logoblock>
            <h2>비밀번호 찾기</h2>
        </div>

        <div className="item5">
            <Input type="email" placeholder="비밀번호를 찾고싶은 이메일을 입력하세요" value ={inputId} onChange={onChangId} className="emailInput"/>
        </div>
        
        <div className="hint">
                {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
        </div>
        

        <div className="item2">
            <button className="enable-button" onClick={sendMail}>임시 비밀번호 발급하기</button>
            <Modal open={modalOpen} close={closeModal} header="BENCH CLEARING">{modalText}</Modal>
        </div>
        
        </Container>
    );
};

export default FindPw;