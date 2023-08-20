import React from "react"
import styled from "styled-components"
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Modal from "../utils/Modal";
import Logo from "../images/logo-big.png"
import Field from "../images/field2.jpg"
import TokenAxiosApi from "../Api/MemberApi";

    const LoginBlock = styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        font-family: 'Noto Sans KR', sans-serif;

        .field {
            width: 100%;
            height: 100vh; /* 뷰포트의 세로 크기에 맞게 조정 */
            object-fit: cover;
            
        }

        @media (max-width: 768px) {
            .field {
                display: none;
            }
            background-color: #395144;
        }
    `;

    const LoginBox = styled.div`
    
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 50px;
        border-radius: 10px;
        background-color:#395144 0.8;

        .login_button{
            
            margin-top: 50px;
            width: 305px; /* 원하는 너비 설정 */
            height: 45px; /* 높이값 초기화 */
            line-height : normal; /* line-height 초기화 */
            
            font-family: inherit; /* 폰트 상속 */
            border: 1px solid #F0EBCE;
            border-radius: 5px; /* iSO 둥근모서리 제거 */
            outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            background-color: #F0EBCE;
            color: white;
        }
        .login_button:active {
            background-color: #c7c7c7;
        }

        .elseLink1 {
            
            text-decoration: none;
            color: #F0EBCE;
        
            font-size: 12px;
            
        }
        .elseLink2 {
            text-decoration: none;
            color: #F0EBCE;
            margin-left: 180px;
            
            transform: skew(-10deg);
            font-size: 12px;
            
        }
    `;

    const Logoblock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
        .logo {
            width: 250px;
            height: auto;
            margin-bottom: 20px;
        }
    `;


    const Input = styled.input`

        
        
        margin-top: 20px;
        width: 300px; /* 원하는 너비 설정 */
        height: 40px; /* 높이값 초기화 */
        line-height : normal; /* line-height 초기화 */
        
        font-family: inherit; /* 폰트 상속 */
        border: 1px solid #c6c6c6;
        border-radius: 5px; /* iSO 둥근모서리 제거 */
        outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
        font-size: 16px;
        font-weight: bold;
        
        &::placeholder {
        color: #c6c6c6;
        }
       
    `;
    

    const Login = () => {

        const context = useContext(UserContext);
        const { setMemberNo, setFavTeam, setNickname, handleLogin} = context;
        const navigate = useNavigate();  

        // 키보드 입력 
        const [inputId, setInputId] = useState("");
        const [inputPw, setInputPw] = useState("");
				
        //팝업 처리
        const [modalOpen, setModalopen] = useState(false);
        const closeModal = () => {
            setModalopen(false);
        }

        const onClickLogin = async () => {
            try {
                const response = await TokenAxiosApi.getToken(inputId, inputPw);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data);
                    const token = localStorage.getItem('token');
                    const userInfoResponse = await TokenAxiosApi.userInfo(token);
                    setMemberNo(userInfoResponse.data.setMemberNo);
                    setNickname(userInfoResponse.data.nickname);
                    setFavTeam(userInfoResponse.data.favTeam);
			        handleLogin();
                    navigate("/");
            } else {
              setModalopen(true);
            }
          } catch (error) {
            setModalopen(true);
          }
        };
        
      	const onChangeId = (e) => {
          setInputId(e.target.value);
        }
    
        const onChangePw = (e) => {
          const passwordCurrent = e.target.value;
          setInputPw(passwordCurrent)
        }


        return (
            
            <LoginBlock>
                <img src={Field} alt="field" className="field"/>
                <LoginBox>
                    
                    <Logoblock>
                        <Link to="/">
                            <img src={Logo} alt="/" className="logo"/>
                        </Link>
                    </Logoblock>
                        <div className="item2">
                            <Input placeholder="아이디" value ={inputId} onChange={onChangeId} />
                        
                        </div>

                        <div className="item2">
                            <Input type="password" placeholder="비밀번호"  value ={inputPw} onChange={onChangePw} />
                        </div>
                        <div className="item2">
                            <button className="login_button"  onClick={onClickLogin}>로그인</button>
                        </div>
                        <div className="else">
                            <Link to="/findpw" className="elseLink1" >비밀번호 찾기</Link>
                            <Link to="/signup" className="elseLink2">회원가입</Link>
                        </div>
                </LoginBox>
                <Modal open={modalOpen} close={closeModal} header="Bench Clearing">
              아이디 및 패스워드를 확인하세요 
                </Modal>
            </LoginBlock>
            
        
        )
    }
    export default Login;