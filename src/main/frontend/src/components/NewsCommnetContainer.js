import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import AxiosApi from "../Api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Modal from "../utils/Modal"

const NewsCommentConatinerDiv = styled.div`
    width: 1000px;
    border-bottom: 1px solid black;
    font-family: 'Noto Sans KR', sans-serif;
    padding-bottom: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    p{
        margin: 0px;
    }
    .info{
        display: flex;
        gap: 30px;
    }
`;

const EditDiv = styled.div`
    display: flex;
    gap: 10px;
    button{
        width: 100px;
        border-radius: 10px;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #395144;
        color: white;
        border: none;
    }
`;

const CommentTextarea = styled.textarea`
    width: 900px;
    height: 100px; 
    resize: none; 
    border-radius: 10px;
    font-family: 'Noto Sans KR', sans-serif;
`;

const NewsCommentConatiner = ({newsNo}) => {
    const [data, setData] = useState();
    const [newComment, setNewComment] = useState("");
    const [modal, setModal] = useState(false);
    const {isLoggedIn} = useContext(UserContext);

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await AxiosApi.getNewsComment(newsNo);
            if(response.status === 200){
                setData(response.data);
            }
        };
        fetchData();
    },[])
    
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const registerComment = async() =>{
        if(!isLoggedIn){
            setModal(true);
            setNewComment("");
        }else{
            const token = localStorage.getItem('token');
            const data ={
                newsNo : newsNo,
                content : newComment
            };
            const response = await AxiosApi.addNewsComment(data, token);
            setData(response.data);
            setNewComment("");
        }
    };

    const confirm = () => {
        setModal(false);
    }

    return(
        <>
        {data&&data.map((data, index) => (
                <NewsCommentConatinerDiv key={index}>
                    <div className="info">
                        <p>{data.nickName}</p>
                        <p>{data.date}</p>
                    </div>
                    <p>{data.content}</p>
                </NewsCommentConatinerDiv>
        ))}
        <EditDiv>
            <CommentTextarea onChange={handleCommentChange} value={newComment}/>
            <button onClick={registerComment}>등록</button>
        </EditDiv>
        <Modal type={true} open={modal} header={"BENCH CLEARING"} confirm={confirm} close={()=>setModal(false)}>로그인 필요.</Modal>
        </>
    );
};

export default NewsCommentConatiner;