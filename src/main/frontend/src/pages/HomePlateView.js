import {useState, useEffect, useCallback, useContext} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import AxiosApi from '../Api/AxiosApi';
import {AiOutlineComment} from 'react-icons/ai';
import {BiLike, BiDislike} from 'react-icons/bi';
import HomePlateLikeDislikeContainer from '../components/HomePlateLikeDislikeContainer';
import { UserContext } from '../context/UserStore';
import Modal from "../utils/Modal"

const BoardBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    margin-bottom: 100px;
    width: auto;
    height: auto;
    align-items: center;
    gap: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    .HomePlate {
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
    gap: 30px;
    padding: 40px;
    p{
        font-size: 20px;
    }
    .boardDetail{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .title{
        border-bottom: 3px solid #395144;
        padding: 0 20px;
        width: 1000px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2{
            margin: 0px;
        };
    };
    .userInfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1000px;
        padding: 0 20px;
        border-bottom: 1px solid #395144;
    }
    .boardInfo{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .boardDetailInfo{
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        width: 1000px;
        img{
            width: 870px;
            height: 600px;
        }
    }
    .BoardCommentDiv{
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
    }
    .EditDiv{
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
    }
`;

const CommentTextarea = styled.textarea`
    width: 900px;
    height: 100px; 
    resize: none; 
    border-radius: 10px;
    font-family: 'Noto Sans KR', sans-serif;
`;

const GoBack = styled.h2`
    color: #395144;
    cursor: pointer;
    &:hover{
        color: #704F4F;
    }
`;

const CommentIcon = styled(AiOutlineComment)`
    font-size: 30px;
`;

const LikeIcon = styled(BiLike)`
    font-size: 30px;
`;

const DislikeIcon = styled(BiDislike)`
    font-size: 30px;
`;

const HomePlateView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [board, setBoard] = useState();
    const [likeData, setLikeData] = useState();
    const [boardComment, setBoardCommentData] = useState();
    const {isLoggedIn} = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [boardComments, setBoardComments] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosApi.getLongBoard(id);
            if (response.status === 200) {
                setBoard(response.data);
            }
        }
        fetchData();
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosApi.getBoardLikeDisLike(id);
            setLikeData(response.data);
        };
        fetchData();
    }, [id]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await AxiosApi.getBoardComment(id);
            setBoardCommentData(response.data);
        };
        fetchData();
    },[id])

    const handeLike = useCallback(async () => {
        if(!isLoggedIn){
            setModal(true);
        }else{
            const token = localStorage.getItem('token');
            const response = await AxiosApi.getBoardLikeCounter(id, token);
            setLikeData(response.data);
        }
    }, [id,isLoggedIn]);

    const handleDislike = useCallback(async () => {
        if(!isLoggedIn){
            setModal(true);
        }else{
            const token = localStorage.getItem('token');
            const response = await AxiosApi.getBoardDisLikeCounter(id, token);
            setLikeData(response.data);
        }
    }, [id, isLoggedIn]);

    const registerComment = async() =>{
        if(!isLoggedIn){
            setModal(true);
            setBoardComments("");
        }else{
            const token = localStorage.getItem('token');
            const data ={
                boardNo : id,
                content : boardComments
            };
            const response = await AxiosApi.addBoardComment(data, token);
            setBoardCommentData(response.data);
            setBoardComments("");            
        }
    };

    return (
        <BoardBlock>
            <h1 className="HomePlate">HOMEPLATE</h1>
            <BoardGrey>
                {board && likeData && boardComment &&(
                    <div className='boardDetail'>
                        <div className='title'>
                            <h2>{board.boardTitle}</h2>
                            <p>{board.boardDate}</p>
                        </div>
                        <div className='userInfo'>
                            <p>{board.nickName}</p>
                            <div className='boardInfo'>
                                <CommentIcon />
                                <p>{boardComment.Count}</p>
                                <LikeIcon />
                                <p>{likeData.totalLike}</p>
                                <DislikeIcon />
                                <p>{likeData.totalDislike}</p>
                            </div>
                        </div>
                        <div className='boardDetailInfo'>
                            {board.boardImgUrl && <img src={board.boardImgUrl} alt="" />}
                            <p>{board.boardContent}</p>
                        </div>
                    </div>
                )}
                <GoBack onClick={()=>navigate("/homeplate")}>목록으로 가기</GoBack>
                {likeData &&
                    <HomePlateLikeDislikeContainer totalLike={likeData.totalLike} totalDislike={likeData.totalDislike} handeLike={handeLike} handeDisLike={handleDislike} />
                }
                {boardComment && boardComment.boardCommentData.map((data, index) => (
                <div className='BoardCommentDiv'>
                    <div className='info'>
                        <p>{data.nickName}</p>
                        <p>{data.date}</p>
                    </div>
                    <p>{data.content}</p>
                </div>
                ))}
                <div className='EditDiv'>
                    <CommentTextarea onChange={(e)=>setBoardComments(e.target.value)} value={boardComments}/>
                    <button onClick={registerComment}>등록</button>
                </div>
            </BoardGrey>
            <Modal type={true} open={modal} header={"BENCH CLEARING"} confirm={()=>navigate("/login")} close={()=>setModal(false)}></Modal>
        </BoardBlock>
    );
};


export default HomePlateView;