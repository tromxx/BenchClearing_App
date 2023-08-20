import React from "react";
import styled from "styled-components"
import { BiLike, BiDislike } from 'react-icons/bi';

const BoardLikeDisLikeContainerDiv = styled.div`
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


const HomePlateLikeDislikeContainer = ({ totalLike, totalDislike, handeLike, handeDisLike }) => {

    return (
        <>
        <BoardLikeDisLikeContainerDiv>
            <div className="like" onClick={handeLike}>
                <LikeIcon />
                <p>{totalLike}</p>
            </div>
            <div className="dislike" onClick={handeDisLike}>
                <DislikeIcon />
                <p>{totalDislike}</p>
            </div>
        </BoardLikeDisLikeContainerDiv>
        </>
        
    );
}

export default HomePlateLikeDislikeContainer;






