package com.Mini_Project_Backend.Mini_Project_Backend.DAO;
import com.Mini_Project_Backend.Mini_Project_Backend.Util.Common;
import com.Mini_Project_Backend.Mini_Project_Backend.Util.SecurityUtil;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemberDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;
    
    
    // 로그인 체크
    public boolean loginCheck(String id, String pwd) {
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement(); // Statement 객체 얻기
            String sql = "SELECT * FROM MEMBER WHERE ID = " + "'" + id + "'";
            rs = stmt.executeQuery(sql);

            while (rs.next()) { // 읽은 데이타가 있으면 true
                String sqlId = rs.getString("ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
                String sqlPwd = rs.getString("PW");
                String sqlAuth = rs.getString("AUTHSTATUS");
                System.out.println("ID : " + sqlId);
                System.out.println("PW : " + sqlPwd);
                System.out.println("AuthStatus : " + sqlAuth);
                if (id.equals(sqlId) && pwd.equals(sqlPwd) && sqlAuth.equals("Y")) {
                    Common.close(rs);
                    Common.close(stmt);
                    Common.close(conn);
                    return true;
                }
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 회원 가입 여부 확인(아이디)
    public boolean regMemberCheck(String id) {
        boolean isNotReg = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM MEMBER WHERE ID = " + "'" + id + "'";
            rs = stmt.executeQuery(sql);
            if (!rs.next()) isNotReg = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return isNotReg; // 가입 되어 있으면 false, 가입이 안되어 있으면 true
    }

    // 닉네임 중복 여부 확인
    public boolean nicknameCheck(String nickname) {
        boolean isAlready = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM MEMBER WHERE NICKNAME = " + "'" + nickname + "'";
            rs = stmt.executeQuery(sql);
            if (!rs.next()) isAlready = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return isAlready; // 이미 존재하는 닉네임이면 false, 존재하지 않는 닉네임이면 true
    }



    // 회원 가입
    public boolean memberRegister(String id, String pwd, String Nickname) {
        int result = 0;
        String sql = "INSERT INTO MEMBER(MEMBER_NO, ID, PW, NICKNAME, FAVTEAM, JOINDATE) VALUES(member_seq.NEXTVAL, ?, ?, ?, ?, SYSDATE)";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            pStmt.setString(2, pwd);
            pStmt.setString(3, Nickname);
            pStmt.setString(4, "0");
            result = pStmt.executeUpdate();
            System.out.println("회원 가입 DB 결과 확인 : " + result);

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);

        if (result == 1) return true;
        else return false;
    }


    // 회원탈퇴
    public boolean memberDelete(String Id) {
        String sql = "DELETE FROM MEMBER WHERE ID = " + "'" + Id + "'";
        int result = 0;
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            result = pStmt.executeUpdate();
            System.out.println("삭제 결과" + Id + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);

        return true;
    }

    // 회원가입을 눌렀을 때 DB에 AuthKey를 추가

    public void updateAuthKey(String id, String authKey, Timestamp expireTime) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        int result = 0;
        String sql = "UPDATE MEMBER SET AUTHKEY = ?, EXPIRETIME = ? WHERE ID = ?";

        try {
            conn = Common.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, authKey);
            pstmt.setTimestamp(2, expireTime);
            pstmt.setString(3, id);
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


    // 이메일에서 링크를 클릭하면 DB값을 바꿔 로그인이 가능하게 하도록 하는 기능
    public boolean updateAuthKeyByAuthKey(String id, String authKey) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        boolean result = false;

        try {
            conn = Common.getConnection();
            String sql = "SELECT * FROM MEMBER WHERE ID=? AND AUTHKEY=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, authKey);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                // 인증 링크 만료 여부 확인
                Timestamp expireTime = rs.getTimestamp("EXPIRETIME");
                if (expireTime.getTime() < System.currentTimeMillis()) {
                    return false; // 만료됨
                }

                sql = "UPDATE MEMBER SET AUTHSTATUS='Y', AUTHKEY=null WHERE ID=? AND AUTHKEY=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, id);
                pstmt.setString(2, authKey);
                pstmt.executeUpdate();
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(pstmt);
            Common.close(conn);
        }
        return result;
    }



    // 비밀번호 찾기에서 임시비밀번호 발급을 눌렀을 때 DB에서 원래 비밀번호를 tempPw로 바꿔주는 기능
    public void changeTempPw(String id, String tempPw) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        boolean result = false;

        try {
            conn = Common.getConnection();
            String sql = "SELECT * FROM MEMBER WHERE ID=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                sql = "UPDATE MEMBER SET PW=? WHERE ID=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, tempPw);
                pstmt.setString(2, id);
                pstmt.executeUpdate();
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Common.close(rs);
            Common.close(pstmt);
            Common.close(conn);
        }
        System.out.println("비밀번호 변경 result" + result);

    }

    public boolean memberUpdate(String id, String pwd, String nickname, String favTeam) {
        int result = 0;
        System.out.println(id);
        System.out.println(pwd);
        System.out.println(nickname);
        System.out.println(favTeam);
        String sql = "UPDATE MEMBER SET PW = ?, NICKNAME = ?, FAVTEAM = ? WHERE ID = ?";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, pwd);
            pStmt.setString(2, nickname);
            pStmt.setString(3, favTeam);
            pStmt.setString(4, id);
            result = pStmt.executeUpdate();
            System.out.println("회원정보 수정 결과 확인 : " + result);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(pStmt);
        Common.close(conn);
        if (result >= 1) return true;
        else return false;
    }
    
    public MemberVO getMemberInfo() {
        MemberVO memberVO = new MemberVO();
        int memberId = SecurityUtil.getMemberId();
        String sql = "SELECT MEMBER_NO, ID, FAVTEAM, NICKNAME FROM MEMBER WHERE MEMBER_NO = "+memberId;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            rs.next();
            memberVO.setMemberNo(rs.getInt("MEMBER_NO"));
            memberVO.setId(rs.getString("ID"));
            memberVO.setNickname(rs.getString("NICKNAME"));
            memberVO.setFavTeam("FAVTEAM");
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return memberVO;
    }
}
