import cx_Oracle
from bs4 import BeautifulSoup
import requests

username = 'SCOTT'
password = 'TIGER'
host = 'Localhost'
port = '1521'

dsn = cx_Oracle.makedsn(host, port)
conn = cx_Oracle.connect(username, password, dsn)
cs = conn.cursor()

def insert_record(news_Title, news_Image_Url, news_Short_Content ,news_long_Content):
    sql = "INSERT INTO News(News_no, News_Title, News_Image_Url, News_Short_Content, News_Long_Content, News_Date) VALUES (news_sequence.nextval, :col1, :col2, :col3, :col4, sysdate)"
    cs.execute(sql, {'col1': news_Title, 'col2': news_Image_Url, 'col3': news_Short_Content, 'col4' : news_Long_Content})
    conn.commit()

response = requests.get('https://www.koreabaseball.com/News/BreakingNews/List.aspx')
news = BeautifulSoup(response.content, 'html.parser')
news_strongTag = news.find_all('strong')
news_aTag  = [];

for e in news_strongTag:
    link = e.find_previous('a')
    news_aTag.append("https://www.koreabaseball.com/News/BreakingNews/" + link.get('href'))

for e in news_aTag:
    response = requests.get(e)
    news = BeautifulSoup(response.content, 'html.parser')

    # News_Title 가죠오기
    news_Title = news.find('span', {'id': 'cphContents_cphContents_cphContents_lblTitle'}).text
    
    # News_Img 가죠오기
    news_Image_tag = news.find('img',{'id' : 'cphContents_cphContents_cphContents_imgView'})
    news_Image_Url = news_Image_tag.get('src')

    #News_Content 가죠오기
    news_content_div = news.find('div',{'class':'detail'})
    news_content = news_content_div.text

    #News_Short_Content 가죠오기
    news_Shot_Content = news_content[1:108]+ "..."

    #news_Long_Content 가죠오기
    news_Long_Content = news_content.replace("[Copyright ⓒ KBO 홈페이지 뉴스, 기사, 사진은 KBO 홈페이지 자료 입니다. 무단전재 및 재배포는 금지되어 있으며 무단전재 및 재배포시 법적인 제재를 받을 수 있습니다.]", "")

    #DB 에 insert 하기
    insert_record(news_Title, news_Image_Url, news_Shot_Content, news_Long_Content)

cs.close()
conn.close()