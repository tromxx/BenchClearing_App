package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.Util.SecurityUtil;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.BoardVO;
import java.sql.*;
import java.sql.Date;
import java.util.*;

public class BoardDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public List<Integer> getBoardPage(String cat) {
        List<Integer> page = new ArrayList<>();
        String sql = "";
        if (cat.equals("All")) {
            sql = "SELECT COUNT(*) FROM BOARD";
        } else if (cat.equals("LatestBoard")) {
            sql = "SELECT COUNT(*) FROM BOARD";
        } else {
            sql = "SELECT COUNT(*) FROM BOARD WHERE BOARD_TITLE LIKE  '%" + cat + "%'";
        }
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            rs.next();
            int totalData = rs.getInt("COUNT(*)");
            page.add(totalData);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return page;
    }

    public List<BoardVO> getBoard(String cat, int page) {
        List<BoardVO> list = new ArrayList<>();
        int postPerPage = 20;
        int endNum = page * postPerPage;
        int startNum = endNum - (postPerPage - 1);
        try {
            String sql = "";
            if (cat.equals("All")) {
                sql = "SELECT f.BOARD_NO, f.BOARD_TITLE, f.BOARD_DATE, s.nickname FROM (SELECT t.*, rownum r FROM (SELECT * FROM BOARD ORDER BY BOARD_NO) t WHERE rownum <= "+endNum+") f JOIN member s ON f.MEMBER_NO = s.member_no WHERE f.r >= " + startNum;
            } else if(cat.equals("LatestBoard")){
                sql = "SELECT f.BOARD_NO, f.BOARD_TITLE, f.BOARD_DATE, s.nickname FROM (SELECT t.*, rownum r FROM (SELECT * FROM BOARD ORDER BY BOARD_DATE DESC) t WHERE rownum <= "+endNum+") f JOIN member s ON f.MEMBER_NO = s.member_no WHERE f.r >= " + startNum;
            }else{
                sql = "SELECT f.BOARD_NO, f.BOARD_TITLE, f.BOARD_DATE, s.nickname FROM (SELECT t.*, rownum r FROM (SELECT * FROM BOARD WHERE BOARD_TITLE LIKE '%"+cat+"%') t WHERE rownum <= "+endNum+") f JOIN member s ON f.MEMBER_NO = s.member_no WHERE f.r >= " + startNum;
            }
            conn = Common.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                int board_No = rs.getInt("BOARD_NO");
                String board_Title = rs.getString("BOARD_TITLE");
                Date board_Date = rs.getDate("BOARD_DATE");
                String nickName = rs.getString("NICKNAME");

                BoardVO boardVO = new BoardVO();
                boardVO.setBoardNo(board_No);
                boardVO.setBoardTitle(board_Title);
                boardVO.setBoardDate(board_Date);
                boardVO.setNickName(nickName);
                list.add(boardVO);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return list;
    }
    
    public boolean insertBoard(String board_Title, String board_Content, String board_Image){
        int result = 0;
        int memberNo = SecurityUtil.getMemberId();
        String sql = "INSERT INTO BOARD (BOARD_NO, MEMBER_NO, BOARD_TITLE, Board_Content, BOARD_IMG_URL, BOARD_DATE) VALUES(BOARD_SEQ.NEXTVAL, ?, ?, ?, ?,SYSDATE)";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setInt(1,memberNo);
            pStmt.setString(2,board_Title);
            pStmt.setString(3,board_Content);
            pStmt.setString(4,board_Image);
            result = pStmt.executeUpdate();
            System.out.println("보드 업데이트 완료");

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);
       return result == 1;
    }
   
   public BoardVO getBoardInfo(int boardNo) {
      
      BoardVO boardVO = new BoardVO();
      try {
         String sql = "SELECT BOARD_NO, BOARD_TITLE, BOARD_DATE, NICKNAME, BOARD_CONTENT, BOARD_IMG_URL FROM BOARD f JOIN member s ON f.MEMBER_NO = s.member_no WHERE BOARD_NO = ?";
         conn = Common.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         stmt.setInt(1, boardNo);
         ResultSet rs = stmt.executeQuery();
         
         if (rs.next()) {
            int board_No = rs.getInt("BOARD_NO");
            String board_Title = rs.getString("BOARD_TITLE");
            Date board_Date = rs.getDate("BOARD_DATE");
            String nickName = rs.getString("NICKNAME");
            String board_content = rs.getString("BOARD_CONTENT");
            String board_img_url = rs.getString("BOARD_IMG_URL");
            
            boardVO.setBoardNo(board_No);
            boardVO.setBoardTitle(board_Title);
            boardVO.setBoardDate(board_Date);
            boardVO.setNickName(nickName);
            boardVO.setBoardContent(board_content);
            boardVO.setBoardImgUrl(board_img_url);
         }
      } catch (Exception e) {
         e.printStackTrace();
      } finally {
         Common.close(rs);
         Common.close(stmt);
         Common.close(conn);
      }
      
      return boardVO;
   }

}