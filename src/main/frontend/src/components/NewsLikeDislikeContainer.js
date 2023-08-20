import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { BiLike, BiDislike } from 'react-icons/bi';
import AxiosApi from "../Api/AxiosApi";
import Modal from "../utils/Modal"
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";

const NewsLikeDisLikeContainerDiv = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    gap: 300px;
    width: 1000px;
    border-bottom: 1px solid black;
    padding-bottom: 25px;
    .like{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        &:hover{
            color: #704F4F;
            cursor: pointer;
        }
    }
    .dislike{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        &:hover{
            color: #704F4F;
            cursor: pointer;
        }
    }
`;

const LikeIcon = styled(BiLike)`
    font-size: 35px;
`;

const DislikeIcon = styled(BiDislike)`
    font-size: 35px;
`;


const NewsLikeDisLikeContainer = ({ newsNo }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(); 
    const [modal, setModal] = useState(false);
    const {isLoggedIn} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosApi.getNewsLikeDisLike(newsNo);
            setData(response.data);
        };
        fetchData();
    }, []); 

    const handeLike = async() => {
        if(!isLoggedIn){
            setModal(true);
        }else{
            const token = localStorage.getItem('token');
            const response = await AxiosApi.getNewsLikeCounter(newsNo, token);
            setData(response.data);
        }
    };

    const handeDisLike = async() => {
        if(!isLoggedIn){
            setModal(true);
        }else{
            const token = localStorage.getItem('token');
            const response = await AxiosApi.getNewsDisLikeCounter(newsNo, token);
            setData(response.data);
        };
    }

    const confirm = () => {
        navigate("/login")
    }

    return (
        <>
        <NewsLikeDisLikeContainerDiv>
            {data && (
                <div className="like" onClick={handeLike}>
                    <LikeIcon />
                    <p>{data.totalLike}</p>
                </div>
            )}
            {data && (
                <div className="dislike" onClick={handeDisLike}>
                    <DislikeIcon />
                    <p>{data.totalDislike}</p>
                </div>
            )}
        </NewsLikeDisLikeContainerDiv>
        <Modal type={true} open={modal} header={"BENCH CLEARING"} confirm={confirm} close={()=>setModal(false)}></Modal>
        </>
        
    );
}

export default NewsLikeDisLikeContainer;






