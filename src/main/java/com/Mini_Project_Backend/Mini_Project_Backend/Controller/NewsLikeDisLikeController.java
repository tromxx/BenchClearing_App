package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.NewsLikeDislikeDAO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsLikeDislikeVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NewsLikeDisLikeController {
     
     NewsLikeDislikeDAO newsLikeDisLikeDAO = new NewsLikeDislikeDAO();
     
     @GetMapping("/likedislike")
     public ResponseEntity<NewsLikeDislikeVO> getNewsLikeDislikeVo(@RequestParam int newsNo) {
          return new ResponseEntity<>(newsLikeDisLikeDAO.getNewsLikeDislike(newsNo), HttpStatus.OK);
     }
     
     @GetMapping("/like")
     public ResponseEntity<NewsLikeDislikeVO> updateLike(@RequestParam int newsNo) {
          return new ResponseEntity<>(newsLikeDisLikeDAO.updateLike(newsNo), HttpStatus.OK);
          
     }
     
     @GetMapping("/dislike")
     public ResponseEntity<NewsLikeDislikeVO> updateDisLike(@RequestParam int newsNo) {
          return new ResponseEntity<>(newsLikeDisLikeDAO.updateDisLike(newsNo), HttpStatus.OK);
          
     }
     

}
