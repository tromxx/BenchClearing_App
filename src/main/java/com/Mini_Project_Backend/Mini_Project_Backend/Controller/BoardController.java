package com.Mini_Project_Backend.Mini_Project_Backend.Controller;

import com.Mini_Project_Backend.Mini_Project_Backend.DAO.BoardDAO;
import com.Mini_Project_Backend.Mini_Project_Backend.VO.BoardVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class BoardController {
    
    @GetMapping("/Homeplate")
    public ResponseEntity<List<BoardVO>> getBoard(@RequestParam String cat, int page) {
        BoardDAO dao = new BoardDAO();
        List<BoardVO> list = dao.getBoard(cat, page);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    @GetMapping("/Homeplate/TotalPage")
    public ResponseEntity<List<Integer>> getBoardPage(@RequestParam String cat) {
        BoardDAO dao = new BoardDAO();
        List<Integer> list = dao.getBoardPage(cat);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    @GetMapping("/Homeplate/View")
    public ResponseEntity<BoardVO> getBoardPage(@RequestParam int board_No) {
        BoardDAO dao = new BoardDAO();
        return new ResponseEntity<>(dao.getBoardInfo(board_No), HttpStatus.OK);
    }
    
    @PostMapping("/Homeplate/Write")
    public ResponseEntity<Boolean> updateBoard(@RequestBody Map<String, String> data) {
        String getBoardTitle = data.get("boardTitle");
        String getBoardContent = data.get("boardContent");
        String getBoardImage = data.get("url");
        BoardDAO dao = new BoardDAO();
        boolean isTure = dao.insertBoard(getBoardTitle, getBoardContent, getBoardImage);
        return new ResponseEntity<>(isTure, HttpStatus.OK);
    }
}
