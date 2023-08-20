package com.Mini_Project_Backend.Mini_Project_Backend.VO;

import lombok.Getter;
import lombok.Setter;

import java.sql.Clob;
import java.sql.Date;

@Getter
@Setter
public class NewsVO {
    private  int news_No;
    private String news_Title;
    private String news_Image_Url;
    private String news_Short_Content;
    private String news_Long_Content;
}
