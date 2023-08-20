import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../Api/AxiosApi";

const WeeklyDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    margin-bottom: 100px;
    width: auto;
    height: auto;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
    gap: 50px;
    .Title{
        font-family: 'inter';
        font-size: 45px;
        transform: skew(-10deg);
        color: #395144;
    }
    .weekBest {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        gap: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .month {
        width: 80px;
        height: 30px;
        text-align: center;
        border-radius: 5px;
    }
    .image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        gap: 30px;
        font-size: 20px;
    }
    
    .date-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
    }

    .image {
        padding: 30px;
        width: 200px;
        height: 180px;
        margin-right: 20px;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .image:hover {
        transform: scale(1.85);
    }

    @media (max-width: 768px) {
    .image {
      width: auto; /* Full width on mobile */
      height: 200px; /* Maintain aspect ratio */
      margin-right: 0;
      object-fit: cover;
    }

    h2 {
        font-size: 35px;
        color: #395144;
    }
    .imgae:hover {
        transform: scale(0.5);
    }

    .image-container {
        font-size: 15px;
    }

    .date-container {
        flex-direction: column;
        font-size: 14px;
        align-items: flex-start;
        margin-bottom : 0;
        gap: 10px;
    }

    .date-container span {
        white-space: nowrap;
    }
  }
`;


const Weekly = () => {

    const [weekly, setWeekly] = useState([]);
    const [monthFilter, setMonthFilter] = useState(4);

    useEffect(()=> {
        const weeklyMonth = async() => {
            const rsp = await AxiosApi.getWeekly(monthFilter);
            if(rsp.status === 200) setWeekly(rsp.data);
        }
        weeklyMonth();
    }, [monthFilter])

    return (
        <WeeklyDiv>
            <h1 className="Title">Weekly Best Line-Up</h1>
            
            <select className="month" value={monthFilter} onChange={(e)=>setMonthFilter(e.target.value)}>
                <option value="4">4월</option>
                <option value="5">5월</option>
            </select>
            
                <div className="image-container">
                    {weekly.map((weeklyItem) => (
                        <div key={weeklyItem.id} className="date-container">
                            <div>{weeklyItem.weeklyDate}</div>
                            <img src={weeklyItem.weekURL1} alt="/weekly" className="image"/>
                            <img src={weeklyItem.weekURL2} alt="/weekly" className="image"/>
                            <img src={weeklyItem.weekURL3} alt="/weekly" className="image"/>
                            <img src={weeklyItem.weekURL4} alt="/weekly" className="image"/>
                        </div>
                    ))}
                </div>
        </WeeklyDiv>
    )
}
export default Weekly;