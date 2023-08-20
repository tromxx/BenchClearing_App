package com.Mini_Project_Backend.Mini_Project_Backend.Controller;




import com.Mini_Project_Backend.Mini_Project_Backend.DAO.WeeklyDAO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.WeeklyVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class WeeklyController {
    @GetMapping("/weekly")
    public ResponseEntity<List<WeeklyVO>> getWeekly(@RequestParam int monthFilter) {
        WeeklyDAO dao = new WeeklyDAO();
        List<WeeklyVO> weekList = dao.getWeekly(monthFilter);
        return new ResponseEntity<>(weekList, HttpStatus.OK);
    }
}
