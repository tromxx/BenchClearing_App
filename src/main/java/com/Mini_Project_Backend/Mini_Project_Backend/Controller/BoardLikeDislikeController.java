package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.BoardLikeDislikeDAO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.BoardLikeDislikeVO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.NewsLikeDislikeVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BoardLikeDislikeController {
   
   BoardLikeDislikeDAO boardLikeDislikeDAO = new BoardLikeDislikeDAO();
   
   @GetMapping("/boardlikedislike")
   public ResponseEntity<BoardLikeDislikeVO> getNewsLikeDislikeVo(@RequestParam int boardNo) {
      return new ResponseEntity<>(boardLikeDislikeDAO.getBoardLikeDislike(boardNo), HttpStatus.OK);
   }
   
   @GetMapping("/boardlike")
   public ResponseEntity<BoardLikeDislikeVO> updateLike(@RequestParam int boardNo) {
      return new ResponseEntity<>(boardLikeDislikeDAO.updateLike(boardNo), HttpStatus.OK);
      
   }
   
   @GetMapping("/boarddislike")
   public ResponseEntity<BoardLikeDislikeVO> updateDisLike(@RequestParam int boardNo) {
      return new ResponseEntity<>(boardLikeDislikeDAO.updateDisLike(boardNo), HttpStatus.OK);
      
   }
}
