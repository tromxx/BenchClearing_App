package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.BoardCommentDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class BoardCommentController {
   
   BoardCommentDAO boardCommentDAO = new BoardCommentDAO();
   
   @GetMapping("/boardcomment")
   public ResponseEntity<Map<String, Object>> getBoardComment(@RequestParam int boardNo) {
      return new ResponseEntity<>(boardCommentDAO.getBoardComment(boardNo), HttpStatus.OK);
   }
   
   @PostMapping("/addboardcomment")
   public ResponseEntity<Map<String, Object>> addBoardComment(@RequestBody Map<String,String> data) {
      int boardNo = Integer.parseInt(data.get("boardNo"));
      String content = data.get("content");
      return new ResponseEntity<>(boardCommentDAO.updateBoardComment(boardNo, content), HttpStatus.OK);
   }
}
