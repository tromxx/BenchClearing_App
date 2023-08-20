package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.Util.SecurityUtil;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsCommentVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class NewsCommentDAO {
     private Connection conn = null;
     private Statement stmt = null;
     private ResultSet rs = null;
     private PreparedStatement pStmt = null;
     
     public List<NewsCommentVO> getNewsComment(int newsNo) {
          List<NewsCommentVO> newsCommentVOList = new ArrayList<>();
          try {
               String sql = "SELECT NC.News_Commnet_Content, NC.News_Comment_Data, M.Nickname FROM NEWS_COMMENT NC JOIN MEMBER M ON NC.Member_No = M.Member_No WHERE NC.News_No = " + newsNo;
               conn = Common.getConnection();
               stmt = conn.createStatement();
               rs = stmt.executeQuery(sql);
               while (rs.next()) {
                    NewsCommentVO newsCommentVO = new NewsCommentVO();
                    newsCommentVO.setNickName(rs.getString("Nickname"));
                    newsCommentVO.setContent(rs.getString("News_Commnet_Content"));
                    newsCommentVO.setDate(rs.getDate("News_Comment_Data"));
                    newsCommentVOList.add(newsCommentVO);
               }
          } catch (Exception e) {
               e.printStackTrace();
          }
          Common.close(rs);
          Common.close(stmt);
          Common.close(conn);
          return newsCommentVOList;
     }
     
     public List<NewsCommentVO> updateNewsComment(int newNo, String content) {
          int memberId = SecurityUtil.getMemberId();
          try {
               conn = Common.getConnection();
               String sql = "INSERT INTO NEWS_COMMENT (News_Comment_No, News_No, Member_No, News_Commnet_Content, News_Comment_Data) VALUES (News_Comment_No_Seq.NEXTVAL, ?, ?, ?, SYSDATE)";
               pStmt = conn.prepareStatement(sql);
               pStmt.setInt(1, newNo);
               pStmt.setInt(2, memberId);
               pStmt.setString(3, content);
               pStmt.executeUpdate();
          } catch (Exception e) {
               e.printStackTrace();
          }
          Common.close(pStmt);
          Common.close(conn);
          
          return getNewsComment(newNo);
     }
}
