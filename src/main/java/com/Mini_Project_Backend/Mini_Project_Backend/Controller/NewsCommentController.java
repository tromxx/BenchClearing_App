package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.NewsCommentDAO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsCommentVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class NewsCommentController {
     
     NewsCommentDAO newsCommentDAO = new NewsCommentDAO();
     
     @GetMapping("/comment")
     public ResponseEntity<List<NewsCommentVO>> getNewsComment(@RequestParam int newsNo) {
          return new ResponseEntity<>(newsCommentDAO.getNewsComment(newsNo), HttpStatus.OK);
     }
     
     @PostMapping("/addnewscomment")
     public ResponseEntity<List<NewsCommentVO>> addNewsComment(@RequestBody Map<String, String> data) {
          int newsNo = Integer.parseInt(data.get("newsNo"));
          String content = data.get("content");
          return new ResponseEntity<>(newsCommentDAO.updateNewsComment(newsNo, content), HttpStatus.OK);
     }

}
