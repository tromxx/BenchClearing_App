package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.WeeklyVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class WeeklyDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public List<WeeklyVO> getWeekly(int monthFilter) {
        List<WeeklyVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT WEEKLY_DATE, WEEKLY_URL1, WEEKLY_URL2, WEEKLY_URL3, WEEKLY_URL4 " +
                    "FROM WEEKLY WHERE EXTRACT(MONTH FROM WEEKLY_DATE) = " + monthFilter
                    + "ORDER BY WEEKLY_DATE";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                Date weeklyDate = rs.getDate("WEEKLY_DATE");
                String weeklyURL1 = rs.getString("WEEKLY_URL1");
                String weeklyURL2 = rs.getString("WEEKLY_URL2");
                String weeklyURL3 = rs.getString("WEEKLY_URL3");
                String weeklyURL4 = rs.getString("WEEKLY_URL4");

                WeeklyVO weeklyVO = new WeeklyVO();
                weeklyVO.setWeeklyDate(weeklyDate);
                weeklyVO.setWeekURL1(weeklyURL1);
                weeklyVO.setWeekURL2(weeklyURL2);
                weeklyVO.setWeekURL3(weeklyURL3);
                weeklyVO.setWeekURL4(weeklyURL4);

                list.add(weeklyVO);

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