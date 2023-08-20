package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.Util.SecurityUtil;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.BoardLikeDislikeVO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsLikeDislikeVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class BoardLikeDislikeDAO {
   private Connection conn = null;
   private Statement stmt = null;
   private ResultSet rs = null;
   private PreparedStatement pStmt = null;
   
   public BoardLikeDislikeVO getBoardLikeDislike(int boardNo){
      BoardLikeDislikeVO boardLikeDislikeVo = new BoardLikeDislikeVO();
      String likeSql = "SELECT COUNT(BOARD_LIKE) AS LIKE_COUNT FROM BOARD_LIKE_DISLIKE WHERE BOARD_NO = " + boardNo + " AND BOARD_LIKE = 1";
      String dislikeSql = "SELECT COUNT(BOARD_DISLIKE) AS DISLIKE_COUNT FROM BOARD_LIKE_DISLIKE WHERE BOARD_NO = " + boardNo + " AND BOARD_DISLIKE = 1";
      
      try{
         conn = Common.getConnection();
         stmt = conn.createStatement();
         
         rs = stmt.executeQuery(likeSql);
         rs.next();
         boardLikeDislikeVo.setTotalLike(rs.getInt("LIKE_COUNT"));
         
         rs = stmt.executeQuery(dislikeSql);
         rs.next();
         boardLikeDislikeVo.setTotalDislike(rs.getInt("DISLIKE_COUNT"));
         
      }catch (Exception e){
         e.printStackTrace();
      }finally {
         Common.close(rs);
         Common.close(stmt);
         Common.close(conn);
      }
      
      return boardLikeDislikeVo;
   }
   
   public boolean checkLikeDisLike(int boardNo) {
      int memberId = SecurityUtil.getMemberId();
      boolean result = false;
      try {
         conn = Common.getConnection();
         stmt = conn.createStatement();
         String sql = "SELECT * FROM BOARD_LIKE_DISLIKE WHERE MEMBER_NO = "+ memberId +" AND BOARD_NO = "+ boardNo;
         rs = stmt.executeQuery(sql);
         if(!rs.next()){
            result = true;
         }
      } catch (Exception e) {
         e.printStackTrace();
      }
      Common.close(rs);
      Common.close(stmt);
      Common.close(conn);
      return result;
   }
   
   public BoardLikeDislikeVO updateLike(int boardNo) {
      int memberId = SecurityUtil.getMemberId();
      boolean condition = checkLikeDisLike(boardNo);
      try {
         conn = Common.getConnection();
         
         if (condition) {
            String insertSql = "INSERT INTO BOARD_LIKE_DISLIKE (Board_Like_Dislike_No, Board_No, Member_No, Board_Like, Board_Dislike) VALUES (Board_like_dislike_seq.NEXTVAL, ?, ?, 1 , 0)";
            pStmt = conn.prepareStatement(insertSql);
         } else {
            String updateSql = "UPDATE Board_LIKE_DISLIKE SET Board_Like = CASE WHEN Board_Like = 1 THEN 0 ELSE 1 END WHERE Board_No = ? AND Member_No = ?";
            pStmt = conn.prepareStatement(updateSql);
         }
         
         pStmt.setInt(1, boardNo);
         pStmt.setInt(2, memberId);
         pStmt.executeUpdate();
      } catch (Exception e) {
         e.printStackTrace();
      }
      Common.close(pStmt);
      Common.close(conn);
      
      return getBoardLikeDislike(boardNo);
   }
   
   public BoardLikeDislikeVO updateDisLike(int boardNo) {
      int memberId = SecurityUtil.getMemberId();
      boolean condition = checkLikeDisLike(boardNo);
      try {
         conn = Common.getConnection();
         
         if (condition) {
            String insertSql = "INSERT INTO Board_LIKE_DISLIKE (Board_Like_Dislike_No, Board_No, Member_No, Board_Like, Board_Dislike) VALUES (Board_like_dislike_seq.NEXTVAL, ?, ?, 0 , 1)";
            pStmt = conn.prepareStatement(insertSql);
         } else {
            String updateSql = "UPDATE Board_LIKE_DISLIKE SET Board_Dislike = CASE WHEN Board_Dislike = 1 THEN 0 ELSE 1 END WHERE Board_No = ? AND Member_No = ?";
            pStmt = conn.prepareStatement(updateSql);
         }
         
         pStmt.setInt(1, boardNo);
         pStmt.setInt(2, memberId);
         pStmt.executeUpdate();
      } catch (Exception e) {
         e.printStackTrace();
      }
      Common.close(pStmt);
      Common.close(conn);
      
      return getBoardLikeDislike(boardNo);
   }
}
