package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.ScheduleDAO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.ScheduleVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController

public class ScheduleController {
    @GetMapping("/schedule")
    public ResponseEntity<List<ScheduleVO>> getSchedule(@RequestParam int monthFilter) {
        ScheduleDAO dao = new ScheduleDAO();
        List<ScheduleVO> scheduleList = dao.getSchedule(monthFilter);
        return new ResponseEntity<>(scheduleList, HttpStatus.OK);
    }
}
