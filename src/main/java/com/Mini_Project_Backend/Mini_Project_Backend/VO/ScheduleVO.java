package com.Mini_Project_Backend.Mini_Project_Backend.VO;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
public class ScheduleVO {
    private Date scheduleDate;
    private String scheduleTime;
    private String scheduleScore;
    private String location;
}