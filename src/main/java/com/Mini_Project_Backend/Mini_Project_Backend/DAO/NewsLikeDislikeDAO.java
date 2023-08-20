package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.Util.SecurityUtil;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsLikeDislikeVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class NewsLikeDislikeDAO {
   
   private Connection conn = null;
   private Statement stmt = null;
   private ResultSet rs = null;
   private PreparedStatement pStmt = null;
   
   public NewsLikeDislikeVO getNewsLikeDislike(int newsNo) {
      NewsLikeDislikeVO newsLikeDislikeVO = new NewsLikeDislikeVO();
      String likeSql = "SELECT COUNT(NEWS_LIKE) AS LIKE_COUNT FROM NEWS_LIKE_DISLIKE WHERE NEWS_NO = " + newsNo + " AND NEWS_LIKE = 1";
      String dislikeSql = "SELECT COUNT(NEWS_DISLIKE) AS DISLIKE_COUNT FROM NEWS_LIKE_DISLIKE WHERE NEWS_NO = " + newsNo + " AND NEWS_DISLIKE = 1";
      
      try {
         conn = Common.getConnection();
         stmt = conn.createStatement();
         
         rs = stmt.executeQuery(likeSql);
         rs.next();
         newsLikeDislikeVO.setTotalLike(rs.getInt("LIKE_COUNT"));
         
         rs = stmt.executeQuery(dislikeSql);
         rs.next();
         newsLikeDislikeVO.setTotalDislike(rs.getInt("DISLIKE_COUNT"));
      } catch (Exception e) {
         e.printStackTrace();
      } finally {
         Common.close(rs);
         Common.close(stmt);
         Common.close(conn);
      }
      
      return newsLikeDislikeVO;
   }
   
   public boolean checkLikeDisLike(int newsNo) {
      int memberId = SecurityUtil.getMemberId();
      boolean result = false;
      try {
         conn = Common.getConnection();
         stmt = conn.createStatement();
         String sql = "SELECT * FROM NEWS_LIKE_DISLIKE WHERE MEMBER_NO = "+ memberId +" AND NEWS_NO = "+ newsNo;
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
   
   public NewsLikeDislikeVO updateLike(int newsNo) {
      int memberId = SecurityUtil.getMemberId();
      boolean condition = checkLikeDisLike(newsNo);
      try {
         conn = Common.getConnection();
         
         if (condition) {
            String insertSql = "INSERT INTO NEWS_LIKE_DISLIKE (News_Like_Dislike_No, News_No, Member_No, News_Like, News_Dislike) VALUES (news_like_dislike_seq.NEXTVAL, ?, ?, 1 , 0)";
            pStmt = conn.prepareStatement(insertSql);
         } else {
            String updateSql = "UPDATE NEWS_LIKE_DISLIKE SET News_Like = CASE WHEN News_Like = 1 THEN 0 ELSE 1 END WHERE News_No = ? AND Member_No = ?";
            pStmt = conn.prepareStatement(updateSql);
         }
         
         pStmt.setInt(1, newsNo);
         pStmt.setInt(2, memberId);
         pStmt.executeUpdate();
      } catch (Exception e) {
         e.printStackTrace();
      }
      Common.close(pStmt);
      Common.close(conn);
      
      return getNewsLikeDislike(newsNo);
   }
   
   public NewsLikeDislikeVO updateDisLike(int newsNo) {
      int memberId = SecurityUtil.getMemberId();
      boolean condition = checkLikeDisLike(newsNo);
      try {
         conn = Common.getConnection();
         
         if (condition) {
            String insertSql = "INSERT INTO NEWS_LIKE_DISLIKE (News_Like_Dislike_No, News_No, Member_No, News_Like, News_Dislike) VALUES (news_like_dislike_seq.NEXTVAL, ?, ?, 0 , 1)";
            pStmt = conn.prepareStatement(insertSql);
         } else {
            String updateSql = "UPDATE NEWS_LIKE_DISLIKE SET News_Dislike = CASE WHEN News_Dislike = 1 THEN 0 ELSE 1 END WHERE News_No = ? AND Member_No = ?";
            pStmt = conn.prepareStatement(updateSql);
         }
         
         pStmt.setInt(1, newsNo);
         pStmt.setInt(2, memberId);
         pStmt.executeUpdate();
      } catch (Exception e) {
         e.printStackTrace();
      }
      Common.close(pStmt);
      Common.close(conn);
      
      return getNewsLikeDislike(newsNo);
   }
}
