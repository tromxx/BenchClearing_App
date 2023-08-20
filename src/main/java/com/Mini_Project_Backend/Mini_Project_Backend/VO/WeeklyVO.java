package com.Mini_Project_Backend.Mini_Project_Backend.VO;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WeeklyVO {
    private Date weeklyDate;
    private String weekURL1;
    private String weekURL2;
    private String weekURL3;
    private String weekURL4;
}
