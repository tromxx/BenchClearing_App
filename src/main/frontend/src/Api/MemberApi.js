import axios from "axios";
const Backend = "";

const MemberApi = {

  // 로그인시 토큰 값 전달
  getToken : async(email, pwd) => {
    const data = {
      email : email,
      pwd : pwd
    };
    return await axios.post(Backend + "/login", data);
  },

  // 토큰으로 유저 정보 가죠오기
  userInfo: async (token) => {
    return await axios.post(Backend + "/user",{},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
  },
  

  editInfo: async (data) => {

      const updatedData = {
        id: data.id,
        pwd: data.pwd,
        nickname: data.nickname,
        favTeam: data.favTeam,
        token: data.token
      };
      console.log(data.token);
      return await axios.post(Backend + "/editinfo", updatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.token
        }
      });
    },

  // 닉네임 중복 조회
  memberNickname: async(nickname) => {
    return await axios.get(Backend + `/nickname?nickname=${nickname}`);
  },
  
  // 회원가입 여부 확인
  memberRegCheck : async(id) => {
    return await axios.get(Backend + `/check?id=${id}`);
  },

  // 회원가입
  memberReg : async(id, pwd, nickname) => {
      const member ={
          id : id,
          pwd: pwd,
          nickname: nickname,
  };
  return await axios.post(Backend + "/new", member);
  },

  // 회원 탈퇴
  memberDel: async(data) => {
      const deleteData = {
          id: data.id,
          token: data.token
      };
      return await axios.post(Backend + "/del", deleteData);
  },

  findPw: async(id) => {
    const data = {
      id: id
    };
    return await axios.post(Backend + "/findpw", data);
  }
};

export default MemberApi;