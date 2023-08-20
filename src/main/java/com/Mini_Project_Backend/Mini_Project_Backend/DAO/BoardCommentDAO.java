package com.Mini_Project_Backend.Mini_Project_Backend.DAO;


import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.BoardCommentVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BoardCommentDAO {
   private Connection conn = null;
   private Statement stmt = null;
   private ResultSet rs = null;
   private PreparedStatement pStmt = null;
   
   public int totalComment(int boardNo) {
      String sql = "SELECT COUNT(*) FROM BOARD_COMMENT WHERE BOARD_NO = " + boardNo;
      int totalComment = 0;
      
      try {
         conn = Common.getConnection();
         stmt = conn.createStatement();
         rs = stmt.executeQuery(sql);
         rs.next();
         totalComment = rs.getInt("COUNT(*)");
      } catch (Exception e) {
         e.printStackTrace();
      } finally {
         Common.close(rs);
         Common.close(stmt);
         Common.close(conn);
      }
      
      return totalComment;
   }
   
   public Map<String, Object> getBoardComment(int boardNo) {
      Map<String, Object> boardCommentData = new HashMap<>();
      List<BoardCommentVO> boardCommentVOList = new ArrayList<>();
      try {
         String sql = "SELECT NC.Board_Comment_Content, NC.Board_Comment_Date, M.Nickname FROM BOARD_COMMENT NC JOIN MEMBER M ON NC.Member_No = M.Member_No WHERE NC.Board_No = " + boardNo;
         conn = Common.getConnection();
         stmt = conn.createStatement();
         rs = stmt.executeQuery(sql);
         while (rs.next()) {
            BoardCommentVO boardCommentVO = new BoardCommentVO();
            boardCommentVO.setNickName(rs.getString("Nickname"));
            boardCommentVO.setContent(rs.getString("Board_Comment_Content"));
            boardCommentVO.setDate(rs.getDate("Board_Comment_Date"));
            boardCommentVOList.add(boardCommentVO);
         }
         boardCommentData.put("boardCommentData", boardCommentVOList);
         boardCommentData.put("Count", totalComment(boardNo));
         
      } catch (Exception e) {
         e.printStackTrace();
      }finally {
         Common.close(rs);
         Common.close(stmt);
         Common.close(conn);
      }
      return boardCommentData;
   }
   
}
