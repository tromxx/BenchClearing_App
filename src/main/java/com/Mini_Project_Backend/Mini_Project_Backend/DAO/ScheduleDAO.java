package com.Mini_Project_Backend.Mini_Project_Backend.DAO;


import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.ScheduleVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

public class ScheduleDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    // 경기 일정 가져오기
    public List<ScheduleVO> getSchedule(int monthFilter) {
        List<ScheduleVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT SCHEDULE_DATE, SCHEDULE_TIME, SCHEDULE_SCORE, SCHEDULE_LOCATION " +
                    "FROM SCHEDULE WHERE EXTRACT(MONTH FROM SCHEDULE_DATE) = " + monthFilter
                    + "ORDER BY SCHEDULE_DATE";
            rs = stmt.executeQuery(sql);


            while(rs.next()) {
                Date scheduleDate = rs.getDate("SCHEDULE_DATE");
                String scheduleTime = rs.getString("SCHEDULE_TIME");
                String scheduleScore = rs.getString("SCHEDULE_SCORE");
                String location = rs.getString("SCHEDULE_LOCATION");
                ScheduleVO scheduleVO = new ScheduleVO();

                scheduleVO.setScheduleDate(scheduleDate);
                scheduleVO.setScheduleTime(scheduleTime);
                scheduleVO.setScheduleScore(scheduleScore);
                scheduleVO.setLocation(location);

                list.add(scheduleVO);
            }

        } catch(Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);

        return list;
    }
}