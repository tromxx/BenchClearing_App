import React from "react";
import { useState } from "react";
import { UserContext } from "../context/UserStore";
import { useContext } from "react";
import { useEffect } from "react";
import TokenAxiosApi from "../Api/MemberApi";
import Modal from "../utils/Modal";
import AxiosApi from "../Api/AxiosApi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import X from "../images/x-mark.png"



const Container = styled.div`
  margin-top: 125px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;

  .xmark {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
  }

.sign {
    
   
    display: flex;
    letter-spacing: 0px;
    color: #313131;
    opacity: 1;
}

  .item1 {
    margin-top: 10px;
		margin-bottom: 10px;
		margin-right: 10px;
		margin-left: 45px;
		display: flex;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }
	.item4 {
		margin-top: 10px;
		margin-bottom: 10px;
		margin-right: 10px;
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
    margin-right: 10px;
    margin-left: 90px;
    display: flex;
    align-items: center;

    .check {
        
        width: 80px; 
        height: auto; 
        line-height : normal; 
        padding: .8em .5em; 
        background-color: #395144;
        color: white;
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

  .enable-button {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    /* margin-bottom: 50px; */
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
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    /* margin-bottom: 50px; */
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
  .disable-button {
    margin-top: 50px;
    margin-left: 30px;
    margin-right: 30px;
    /* margin-bottom: 50px; */
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 400px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
  }
  .delete-button {
      margin-top: 20px;
      margin-left: 30px;
      margin-right: 30px;
      /* margin-bottom: 50px; */
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 26px;
      font-weight: bold;
      width: 400px;
      height: 50px;
      color: white;
      border: none;
      font-size: 15px;
      font-weight: 400;
      border-radius: 18px;
      background-color: red;
      cursor: pointer;
  }
  .delete-button:active {
    background-color: #999;
    
  }

	@media(max-width: 768px) {
   
    margin-top: 0;
    margin-left:-40px;
    margin-bottom: 0;
    background-color: #395144;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;

    .sign {
      color: white;
      display: flex;
      letter-spacing: 0px;
      color: #313131;
      opacity: 1;
    }

    .item1,
    .item2,
    .item4 {
      display: flex;
      align-items: center;
      color: white;
    }

    .item3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      font-size: 14px;
      color: white;
    }

    .item5 {
      display: flex;
      align-items: center;
      color: white;

      .check {
        width: 80px;
        height: auto;
        line-height: normal;
        padding: 0.8em 0.5em;
        background-color: #395144;
        color: white;
        font-family: inherit;
        border: 1px solid #999;
        border-radius: 18px;
        outline-style: none;
        cursor: pointer;
      }
    }

    .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      color: #999;
    }

    .enable-button,
    .disable-button {
      margin-top: 50px;
      margin-left: 30px;
      margin-right: 30px;
      /* margin-bottom: 50px; */
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 26px;
      font-weight: bold;
      width: 250px;
      height: 50px;
      color: white;
      font-size: 15px;
      font-weight: 400;
      border-radius: 18px;
      
    }

    .enable-button {
      background-color: #395144;
      cursor: pointer;
      border: orange;
      font-weight: 700;
    }

    .enable-button:active {
      background-color: #999;
      border: #999;
    }

    .disable-button {
      background-color: #999;
      border: orange;
    }
    h2 {
      color: white;
    }
    .delete-button{
      width: 250px;
    }
  }
  
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 400px; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */

  @media(max-width: 768px) {
    width: 250px;
  }

  
`;

const Select = styled.select` 
  margin-left: 30px;
  margin-right: 30px;
  width: 400px; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
	text-align: center;
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  
  @media(max-width: 768px) {
    width: 260px;
  }
`;




const Desc = styled.p`
	float: left;
	font-size: 12px;

  @media(max-width: 768) {
    color: white;
  }
`;

const MyWriting = styled.div`
  margin-top: 30px;
  width: 800px;
  height: 400px;
  margin-bottom: 100px;
  border: 1px solid #d6d6d6;
  border-radius: 18px;

  @media(max-width: 768px){
    width: 400px;
    height: 400px;
    margin-left: 35px;
    margin-right: 0px;
    background-color: white;
  }
`;


const MyPage = () => {
    const context = useContext(UserContext);
    const { memberNo, setMemberNo, userId, setUserId, password, favTeam,  nickname, handleLogout } = context;
		const [inputNowPw, setInputNowPw] = useState("");
		const [inputNewPw, setInputNewPw] = useState("");
		const [inputConPw, setInputConPw] = useState("");
		const [inputNickName, setInputNickname] = useState("");
		const [inputFavTeam, setInputFavTeam] = useState("");
    const [originFavTeam, setOriginFavTeam] = useState("");
    const [originNickname, setOriginNickname] = useState("");
    const originPwd = password;


    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await TokenAxiosApi.userInfo(token);
            setMemberNo(response.data[0].memberNo);
            setUserId(response.data[0].id);
            setInputNickname(response.data[0].nickname)
            setOriginNickname(response.data[0].nickname);
            setOriginFavTeam(response.data[0].favTeam);
            setInputFavTeam(response.data[0].favTeam);
          
        } catch (error) {
          console.error("세션 복구 중 오류 발생 : ", error);
        }
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        await restoreSession(); // restoreSession 비동기로 처리
      }
      fetchData(); // fetchData 함수 호출
    }, []); 

    // 오류 메시지
      
    const [pwMessage, setPwMessage] = useState("");
		const [nowPwMessage, setNowPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [nickNameMessage, setNickNameMessage] = useState("");

    // 유효성 검사
		
		const [isNowPw, setIsNowPw] = useState(false);
		const [isNewPw, setIsNewPw] = useState(false)
		const [isConPw, setIsConPw] = useState(false);
		const [isNickName, setIsNickName] = useState(false);
	
     
    
    // 팝업

		const [modalOpen, setModalOpen] = useState(false);
		const [modalText, setModalText] = useState("");
    const [type, setType] = useState("");
    
		const closeModal = () => {
        setModalOpen(false);
    };

    // 비밀번호 정규식 확인

    const onChangePw = (e) => {
        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value ;
        setInputNewPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자, 영문자, 특수문자를 포함한 8~25자리로 입력해주세요')
            setIsNewPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 :)')
            setIsNewPw(true);
        }        
    }


		// 현재 비밀번호 창 일치 여부 

    const onChangeNowPw = (e) => {
			const passwordCurrent = e.target.value;
			setInputNowPw(passwordCurrent);
			if (passwordCurrent !== password) {
					setNowPwMessage('비밀번호가 일치하지 않습니다.')
					setIsNowPw(false)
			} else {
					setNowPwMessage('비밀번호가 일치 합니다.')
					setIsNowPw(true);
			}      
		}


    // 바꾸는 비밀번호 확인 창 일치 여부 

    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputNewPw) {
            setConPwMessage('비밀번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setConPwMessage('비밀번호가 일치 합니다. )')
            setIsConPw(true);
        }      
    }

    // 닉네임 정규식 체크

    const onChangeNickName = (e) => {
        setInputNickname(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 12) {
            setNickNameMessage("2자리 이상 12자리 미만으로 입력해 주세요.");
            setIsNickName(false);    
        } else {
            setNickNameMessage("올바른 형식 입니다.");
            
        }
    }


     // 닉네임 중복확인
     const onClickNickNameCheck = async() => {
        const nickNameCheck = await AxiosApi.memberNickname(inputNickName);
        if(nickNameCheck.data === true) {
            setNickNameMessage("사용 가능한 닉네임입니다.");
            setIsNickName(true);
        } else {
            setNickNameMessage("이미 사용중인 닉네임입니다.");
            setIsNickName(false); 
        }
    }  

    

    const onClickEdit = async () => {
      try {
        const token = localStorage.getItem('token');

        const updatedData = {
          id: userId,
          pwd: inputNewPw || originPwd,
          nickname: inputNickName,
          favTeam: inputFavTeam,
          token: token
        };
        
    
        // editInfo 함수 호출
        const isUpdated = await TokenAxiosApi.editInfo(updatedData);

        
    
        if (isUpdated) {
          setModalText("내 정보 수정이 완료되었습니다.");
          setOriginFavTeam(inputFavTeam);
          setOriginNickname(inputNickName);
        } else {
          setModalText("내 정보 수정에 실패하였습니다.");
        }
    
        setModalOpen(true);
      } catch (error) {
        setModalText("내 정보 수정 에러:", error);
        setModalOpen(true);
      }
    };

    const onclickDelete = () => {
      setType("open");
      setModalText("정말로 탈퇴하시겠습니까?");
      setModalOpen(true);
    };
    
    const realDelete = async() => {
      setModalOpen(false);
      setType("");
      setModalOpen(true);
      const token = localStorage.getItem('token');
      const deleteData = {
        id: userId,
        token: token
      }

      const isDeleted = await AxiosApi.memberDel(deleteData);
        
      if(isDeleted) {
        setModalText("회원 탈퇴에 성공했습니다.");
      } 
      setModalOpen(true);
      handleLogout()
    }
    


    return(
        <Container>
        <div className="sign">
            <h2>내 정보</h2>
            <Link to="/" className="home">
              <img src={X} alt="xmark" className="xmark" />
            </Link>
        </div>

        <div className="item2">
						<Desc>아이디</Desc>
            <Input type="email" placeholder="이메일" value ={userId} className="emailInput"/>
        </div>
    		<div className="item5">
					<Desc>닉네임</Desc>
            <Input type="text" placeholder="닉네임" value ={inputNickName} onChange={onChangeNickName} className="nicknameInput"/>
            <button className="check" onClick={onClickNickNameCheck}>중복확인</button>
        </div>
        <div className="hint">
                {inputNickName.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>{nickNameMessage}</span>)}
        </div>
        
        <div className="item4">
				<Desc>응원구단</Desc>
				<Select value={inputFavTeam} onChange={(e) => setInputFavTeam(e.target.value)}>
						<option value="0">응원하는 구단을 선택하세요</option>
            <option value="1">SSG 랜더스</option>
            <option value="2">두산 베어스</option>
            <option value="3">키움 히어로즈</option>
            <option value="4">한화 이글스</option>
            <option value="5">롯데 자이언츠</option>
            <option value="6">삼성 라이온즈</option>
            <option value="7">LG 트윈스</option>
            <option value="8">NC 다이노스</option>
            <option value="9">kt Wiz</option>
            <option value="10">KIA 타이거즈</option>
        </Select>
        </div>



				<div className="item1">
					
            <Input type="password" placeholder="현재 비밀번호" value ={inputNowPw} onChange={onChangeNowPw}/>
				</div>
				<div className="hint">
						{inputNowPw.length > 0 && (
							<span>{nowPwMessage}</span>)}
				</div>
        <div className="item1">
					
            <Input type="password" placeholder="변경할 비밀번호" value ={inputNewPw} onChange={onChangePw}/>
        </div>
        <div className="hint">
                {inputNewPw.length > 0 && (
                <span>{pwMessage}</span>)}
        </div>
        <div className="item1">
					
            <Input type="password" placeholder="변경할 비밀번호 확인" value ={inputConPw} onChange={onChangeConPw}/>
        </div>
        <div className="hint">
                {inputConPw.length > 0 && (
                <span>{conPwMessage}</span>)}
        </div>

        <div className="item1">
            {((isNowPw && isNewPw && isConPw) || (isNickName && inputNickName !== originNickname) || (inputFavTeam !== originFavTeam)) ? 
            <button className="enable-button" onClick={onClickEdit}>수정완료</button> :
            <button className="disable-button">수정완료</button>}
            <Modal open={modalOpen} type={type} confirm={realDelete} close={closeModal} header="Bench Clearing">{modalText} </Modal>
        </div>

        <div className="item1">
          <button className="delete-button" onClick={onclickDelete}>회원탈퇴</button>
        </div>

        </Container>
    );
};

export default MyPage;