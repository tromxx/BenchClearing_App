import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AxiosApi from "../Api/AxiosApi";


// 슬라이더 컨테이너에 대한 스타일 정의
const SliderContainer = styled.div`
  font-family: 'Inter', sans-serif;
	width: 550px; /* 슬라이더의 너비 */
  height: 500px; /* 슬라이더의 높이 */
  margin-left: 40px;
  margin-top: -65px;
  
	h2 {
		transform: skew(-10deg);
		color: #395144;
    margin-bottom: 70px;
    margin-left: 150px;
	}

	@media(max-width: 768px) {
		
		margin-left: 25px;
		width: 100%;
		
	}
`;

// 슬라이더 내부 요소에 대한 스타일 정의
const SliderItem = styled.div`
  width: 480px;
  height: 480px;
	

	div {
		width: 480px;
  	height: 480px;
	}
	
`;

const Slide = () => {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

		const today = new Date();
		const month = today.getMonth();

		const [weekly, setWeekly] = useState([]);
    const [monthFilter, setMonthFilter] = useState(5);
		
    useEffect(()=> {
        const weeklyMonth = async() => {
            const rsp = await AxiosApi.getWeekly(monthFilter);
            if(rsp.status === 200) setWeekly(rsp.data);
        }
        weeklyMonth();
    }, [monthFilter])

    return (
      <SliderContainer>
        <h2>Weekly Best Lineup</h2>
				{console.log(weekly)}
        <Slider {...settings}>
				{weekly.map((weeklyItem) => (
                        <SliderItem key={weeklyItem.id} className="date-container">
                            
                            <img src={weeklyItem.weekURL1} alt="/weekly" className="image"/>
                            <img src={weeklyItem.weekURL2} alt="/weekly" className="image"/>
                            <img src={weeklyItem.weekURL3} alt="/weekly" className="image"/>
                            <img src={weeklyItem.weekURL4} alt="/weekly" className="image"/>
                        </SliderItem>
                    ))}
        </Slider>
      </SliderContainer>
    );
  }

	export default Slide;
