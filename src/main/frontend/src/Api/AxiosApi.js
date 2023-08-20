import axios from "axios";


const Backend = "";

const AxiosApi = {
    getShortDetailNews : async(category, page) => {
        return await axios.get(Backend + `/News?cat=${category}&page=${page}`);
    },

    getNewsPages : async(category) => {
        return await axios.get(Backend + `/News/TotalPage?cat=${category}`)
    },

    getNewsLikeDisLike : async(newsId) => {
      return await axios.get(Backend + `/likedislike?newsNo=${newsId}`)
    },

    getNewsLikeCounter: async (newsId, token) => {
      return await axios.get(Backend + `/like?newsNo=${newsId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    },

    getNewsDisLikeCounter: async (newsId, token) => {
      return await axios.get(Backend + `/dislike?newsNo=${newsId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    },

    getNewsComment: async(newsId) => {
      return await axios.get(Backend + `/comment?newsNo=${newsId}`); 
    },

    addNewsComment: async(data, token) => {
      return await axios.post(Backend + "/addnewscomment",data,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    },

    
    addBoardComment: async(data, token) => {
      return await axios.post(Backend + "/addboardcomment",data,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    },


    getBoardLikeDisLike : async(boardId) => {
      return await axios.get(Backend +`/boardlikedislike?boardNo=${boardId}`);
    },

    getBoardDisLikeCounter : async(boardId, token) => {
      return await axios.get(Backend + `/boarddislike?boardNo=${boardId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    },

    getBoardLikeCounter : async(boardId, token) => {
      return await axios.get(Backend + `/boardlike?boardNo=${boardId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    },

    getBoardComment : async(boardId)=>{
      return await axios.get(Backend + `/boardcomment?boardNo=${boardId}`);
    },

    getLongDetailNews : async(newsId) =>{
       return await axios.get(Backend + `/News/View?news_no=${newsId}`); 
    }, 

    getBoard : async(cat, page) => {
      return await axios.get(Backend + `/Homeplate?cat=${cat}&page=${page}`)
    },

    getBoardPage : async(cat) => {
      return await axios.get(Backend + `/Homeplate/TotalPage?cat=${cat}`)
    },

    getLongBoard : async(boardNo) =>{
      return await axios.get(Backend + `/Homeplate/View?board_No=${boardNo}`); 
   }, 

   writeBoard : async(data, token) => {
    return await axios.post(Backend + "/Homeplate/Write",data,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
   },

    getSchedule : async(monthFilter) => {
      return await axios.get(Backend + `/schedule?monthFilter=${monthFilter}`);
    },

    getWeekly : async(monthFilter) => {
      return await axios.get(Backend + `/weekly?monthFilter=${monthFilter}`);
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
}

export default AxiosApi;