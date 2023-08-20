import { createContext, useState } from "react";
import { useEffect } from "react";
import TokenAxiosApi from "../Api/MemberApi";
import { Navigate } from "react-router-dom";


export const UserContext = createContext(null);

const UserStore = (props) => {
    const [memberNo, setMemberNo] = useState();
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 중인지
    const [favTeam, setFavTeam] = useState("");
    const [nickname, setNickname]  = useState("");

    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await TokenAxiosApi.userInfo(token);
          setMemberNo(response.data.setMemberNo);
          setNickname(response.data.nickname);
          setFavTeam(response.data.favTeam);
          handleLogin();          // restoreSession 처리 완료 후 handleLogin 호출
        } catch (error) {
          console.log("세션 복구 중 오류 발생 : ", error);
          handleLogout();
          Navigate("/");
        }
      }
    };

    const handleLogin = () => {
          setIsLoggedIn(true);
    };

    useEffect(() => {
      const fetchData = async () => {
        await restoreSession(); // restoreSession 비동기로 처리
      }
      fetchData(); // fetchData 함수 호출
    }, []); 
  
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserId("");
    };
  
    return (
      <UserContext.Provider
        value={{ memberNo, setMemberNo, userId, setUserId, favTeam, setFavTeam, nickname, setNickname, isLoggedIn, handleLogin, handleLogout}}
      >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserStore;