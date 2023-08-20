package com.Mini_Project_Backend.Mini_Project_Backend.DAO;

import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsLikeDislikeVO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NewsDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    //Pagination 울 위해 totalSize 조회
    public List<Integer> getNewsPage(String cat) {
        List<Integer> page = new ArrayList<>();
        String sql = "";
        if (cat.equals("All")) {
            sql = "SELECT COUNT(*) FROM NEWS";
        } else if (cat.equals("LatestNews")) {
            sql = "SELECT COUNT(*) FROM NEWS";
        } else {
            sql = " SELECT COUNT(*) FROM NEWS WHERE NEWS_TITLE LIKE '%" + cat + "%'";
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

    //category 랑 page 로 뉴스 조회 하기
    public List<NewsVO> getNews(String cat, int page) {
        List<NewsVO> list = new ArrayList<>();
        int postPerPage = 10;
        int endNum = page * postPerPage;
        int startNum = endNum - (postPerPage - 1);
        try {
            String sql = "";
            if (cat.equals("All")) {
                sql = "SELECT f.NEWS_NO,f.NEWS_TITLE,f.NEWS_IMAGE_URL, f.NEWS_SHORT_CONTENT FROM (SELECT t.*, rownum r FROM (SELECT * FROM NEWS) t WHERE rownum <= " + endNum + ") f WHERE r >=" + startNum;
            } else if (cat.equals("LatestNews")) {
                sql = "SELECT NEWS_NO, NEWS_TITLE, NEWS_IMAGE_URL, NEWS_SHORT_CONTENT FROM ( SELECT NEWS_NO, NEWS_TITLE, NEWS_IMAGE_URL, NEWS_SHORT_CONTENT, NEWS_DATE, ROWNUM AS RNUM FROM (SELECT NEWS_NO, NEWS_TITLE, NEWS_IMAGE_URL, NEWS_SHORT_CONTENT, NEWS_DATE FROM NEWS ORDER BY NEWS_DATE DESC)) WHERE RNUM BETWEEN " + startNum + " AND " + endNum;
            } else {
                sql = "SELECT NEWS_NO, NEWS_TITLE, NEWS_IMAGE_URL, NEWS_SHORT_CONTENT FROM (SELECT NEWS_NO, NEWS_TITLE, NEWS_IMAGE_URL, NEWS_SHORT_CONTENT, ROWNUM AS RNUM FROM NEWS WHERE NEWS_TITLE LIKE '%" + cat + "%') WHERE RNUM BETWEEN " + startNum + " AND " + endNum;
            }
            conn = Common.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                int news_No = rs.getInt("NEWS_NO");
                String news_Title = rs.getString("NEWS_TITLE");
                String news_Image_Url = rs.getString("NEWS_IMAGE_URL");
                String news_Short_Content = rs.getString("NEWS_SHORT_CONTENT");
                NewsVO newsVO = new NewsVO();

                newsVO.setNews_No(news_No);
                newsVO.setNews_Title(news_Title);
                newsVO.setNews_Image_Url(news_Image_Url);
                newsVO.setNews_Short_Content(news_Short_Content);
                list.add(newsVO);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return list;
    }

    // news_number 로 뉴스 정보 조회 하기
    public NewsVO getNewsInfo(int news_Numbers) {
        NewsVO newsVO = new NewsVO();
        try {
            String sql = "SELECT NEWS_NO, NEWS_TITLE, NEWS_IMAGE_URL, NEWS_LONG_CONTENT FROM NEWS WHERE NEWS_NO = '" + news_Numbers + "'";
            conn = Common.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            rs.next();
            int news_No = rs.getInt("NEWS_NO");
            String news_title = rs.getString("NEWS_TITLE");
            String news_Image_Url = rs.getString("NEWS_IMAGE_URL");
            String news_Long_Content = rs.getString("NEWS_LONG_CONTENT");
            newsVO.setNews_No(news_No);
            newsVO.setNews_Title(news_title);
            newsVO.setNews_Image_Url(news_Image_Url);
            newsVO.setNews_Long_Content(news_Long_Content);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return newsVO;
    }
}
