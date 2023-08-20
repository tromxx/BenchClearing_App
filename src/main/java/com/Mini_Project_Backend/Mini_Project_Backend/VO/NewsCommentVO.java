package com.Mini_Project_Backend.Mini_Project_Backend.VO;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class NewsCommentVO {
     private String nickName;
     private String content;
     private Date date;
}
