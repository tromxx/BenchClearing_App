package com.Mini_Project_Backend.Mini_Project_Backend.Util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class SecurityUtil {
     
     private static Connection conn = null;
     
     private static Statement stmt = null;
     
     private static ResultSet rs = null;
     
     
     private SecurityUtil() {}
     
     public static int getMemberId() {
          final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
          if (authentication == null || authentication.getName() == null) {
               throw new RuntimeException("해당 정보 없음");
          }else {
               try {
                    String email = authentication.getName();
                    String sql = "SELECT MEMBER_NO FROM MEMBER WHERE ID = '" + email + "'";
                    conn = Common.getConnection();
                    stmt = conn.createStatement();
                    rs = stmt.executeQuery(sql);
                    rs.next();
                    return rs.getInt("MEMBER_NO");
               } catch (Exception e) {
                    e.printStackTrace();
               }
               Common.close(rs);
               Common.close(stmt);
               Common.close(conn);
          }
          return 0;
     }
}
