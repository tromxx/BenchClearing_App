package com.Mini_Project_Backend.Mini_Project_Backend.Security;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

    private static final long EXPIRATION_TIME = 3600000; // 토큰 만료 시간 설정 (1시간)
    private static final String SECRET_KEY = "revofbbCommunityBC"; // 토큰 서명에 사용할 비밀키

    public String generateAuthToken(UserDetails userDetails) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1일 유효
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public boolean verifyAuthToken(String authToken) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(authToken)
                    .getBody();

            // 토큰 검증 성공
            return true;
        } catch (Exception e) {
            // 토큰 검증 실패
            return false;
        }
    }

    // 토큰에서 사용자명 추출 메소드
    public static String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    // 토큰에서 모든 정보 추출 메소드
    private static Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // 토큰 유효성 검증 메소드
    public static Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        System.out.println("토큰에서 추출한 사용자 이름: " + username);
        System.out.println("UserDetails의 사용자 이름: " + userDetails.getUsername());

        boolean isTokenExpired = isTokenExpired(token);
        System.out.println("토큰이 만료되었는지: " + isTokenExpired);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired);
    }

    private static Boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }


}

