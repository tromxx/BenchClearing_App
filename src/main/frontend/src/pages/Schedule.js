import React, {useEffect, useState} from "react";
import AxiosApi from "../Api/AxiosApi";
import styled from "styled-components";


const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  margin-bottom: 100px;
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  gap: 50px;
  font-family: 'Noto Sans KR', sans-serif;
  .schedule {
    font-family: 'Inter', sans-serif;
    color: #395144;
    font-size: 45px;
    transform: skew(-10deg);
    text-align: center;
  }

  table {
    width: 1000px;
    border-collapse: collapse;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
  thead{
    background-color: #6f2727;
    color: white;
  }

  th, td {
    text-align: center;
    border: 1px solid black;
    font-size: 18px;
  }
  .date, .time, .score, .stadium {
    width: 200px;
  } 
  .optionMon {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    gap: 50px;
    font-size: 23px;
    margin-bottom: 30px;
    li:hover{
        cursor: pointer;
        color: #395144;
        transform: scale(1.05);
    }
  }

  .month {
    width: 80px;
    height: 30px;
    cursor: pointer;
  }

  .scheduleDate {
    font-weight: bold;
    background-color: #f2f2f2;
  }

  .scheduleGroup {
    border-top: 2px solid #000;
    margin-top: 20px;
  }

  th {
    background-color: #395144;
    color: white;
  }
  
  .date, .time, .match, .stadium {
     width: 200px;
  }

  @media(max-width:768px) {
    .schedule {
      font-size: 30px;
    }

    table {
      width: 90%;
    }

    th, td {
      font-size: 14px;
    }

    .optionMon {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      gap: 30px;
      font-weight: bold;
      font-size: 18px; 
      margin-bottom: 30px;

      li {
        border-right: 5px solid #395144;
        padding-right: 20px; 
      }

      li:last-child {
        border: none;
      }

      li:hover {
        cursor: pointer;
        color: #395144;
        transform: scale(1.05);
      }
    }
  }
`;

const Schedule = () => {
    const [schedule, setSchedule] = useState([]);

    const [monthFilter, setMonthFilter] = useState(4);
    
    useEffect(()=> {
        const scheduleMonth = async() => {
            const rsp = await AxiosApi.getSchedule(monthFilter);
            if(rsp.status === 200) setSchedule(rsp.data);

        }
        scheduleMonth();
    }, [monthFilter]);

    const getTheValue = (value) => {
        setMonthFilter(value);
    }

    function getMonthByName(month){
        console.log("month is " + month)
        let monthName = ""
        switch(month){
            case "01": 
            monthName = " Jan ";
            break;

            case "02": 
            monthName = " Feb ";
            break;

            case "03": 
            monthName = " Mar ";
            break;

            case "04": 
            monthName = " Apr ";
            break;

            case "05": 
            monthName = " May ";
            break;

            case "06": 
            monthName = " Jun ";
            break;

            case "07": 
            monthName = " Jul ";
            break;

            case "08": 
            monthName = " Aug ";
            break;

            case "09": 
            monthName = " Sep ";
            break;
            
            case "10": 
            monthName = " Oct ";
            break;

            case "11": 
            monthName = " Nov ";
            break;
            
            case "12": 
            monthName = " Dec ";
            break;

            default:
                console.log("Something spooky has happened!");
        }
        return monthName;
    }

    const formatDate = (val) => {
        let newDate = val.split("-");
        return newDate[2] + getMonthByName(newDate[1]) + newDate[0];
    }


    return(
        <ScheduleDiv>
                <h1 className="schedule">SCHEDULE</h1>
                <div className="optionMon">
                <li onClick={() => getTheValue(4)}>4월</li>
                <li onClick={() => getTheValue(5)}>5월</li>
                <li onClick={() => getTheValue(6)}>6월</li>
                <li onClick={() => getTheValue(7)}>7월</li>
                <li onClick={() => getTheValue(8)}>8월</li>
                <li onClick={() => getTheValue(9)}>9월</li>
                </div>
                <table>
                    <tbody>
                    {schedule.map((scheduleItem, index) => {
                        
                      const isGroupStart = index % 5 === 0;
                      const scheduleGroupClass = isGroupStart ? 'scheduleGroup' : '';

                      return (
                        
                        <React.Fragment key={scheduleItem.id}>
                        
                              {isGroupStart && (
                                <tr className={scheduleGroupClass}>
                                  <th className="date">날짜</th>
                                  <th className="match">경기</th>
                                  <th className="stadium">구장</th>
                                  <th className="time">시간</th>
                                </tr>
                              )}
                              <tr>
                                {isGroupStart && (
                                  <td className="scheduleDate" rowSpan={5}>
                                    {formatDate(scheduleItem.scheduleDate)}</td>
                                )}
                                <td className="scheduleScore">{scheduleItem.scheduleScore}</td>
                                <td className="scheduleStadium">{scheduleItem.location}</td>
                                <td className="scheduleTime">{scheduleItem.scheduleTime}</td>
                              </tr>
                        </React.Fragment>
                          );
                        })}
                        </tbody>
                        </table>
        </ScheduleDiv>
    );
}
export default Schedule;