package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.BoardLikeDislikeVO;

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
}
