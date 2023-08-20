package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.BoardCommentDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BoardCommentController {
   
   BoardCommentDAO boardCommentDAO = new BoardCommentDAO();
   
   @GetMapping("/boardcomment")
   public ResponseEntity<Map<String, Object>> getBoardComment(@RequestParam int boardNo) {
      return new ResponseEntity<>(boardCommentDAO.getBoardComment(boardNo), HttpStatus.OK);
   }
}
