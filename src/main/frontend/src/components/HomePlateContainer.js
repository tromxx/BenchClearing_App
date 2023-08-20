import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";


const TrContainer = styled.tr`
    background-color: white;
    td{
        text-align: center;
        font-size: 20px;
        padding: 17px;
    }
    &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;


const BoardContainer = (props) => {

    const navigate = useNavigate();
    
    const getTheValue = (id) => {
        navigate(`/homeplate/${id}`);
    };
    
    return(
        <TrContainer onClick={()=>{getTheValue(props.exp.boardNo)}}>
            <td>{props.exp.boardNo}</td>
            <td colSpan={3}>{props.exp.boardTitle}</td>
            <td>{props.exp.nickName}</td>
            <td>{props.exp.boardDate}</td>
        </TrContainer>
    );
};

export default BoardContainer;