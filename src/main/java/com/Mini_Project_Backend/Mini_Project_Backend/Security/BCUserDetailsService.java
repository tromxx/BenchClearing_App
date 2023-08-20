package com.Mini_Project_Backend.Mini_Project_Backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Service
public class BCUserDetailsService implements UserDetailsService {
    @Autowired
    private DataSource dataSource;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String sql = "SELECT * FROM MEMBER WHERE ID = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, email);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String sqlId = rs.getString("ID");
                    String sqlPw = rs.getString("PW");
                    System.out.println(("USER : " + User.withUsername(sqlId)
                            .password(sqlPw)
                            .roles("USER")
                            .build()));
                    return User.withUsername(sqlId)
                            .password(sqlPw)
                            .roles("USER")
                            .build();
                } else {
                    throw new UsernameNotFoundException("User not found.");
                }
            }
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found.", e);
        }
    }
}