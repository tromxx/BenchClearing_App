package com.Mini_Project_Backend.Mini_Project_Backend.VO;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Setter
@Getter

public class BoardVO {
    private int boardNo;
    private int memberNo;
    private String nickName;
    private  String boardImgUrl;
    private String boardTitle;
    private Date boardDate;
    private String boardContent;
}