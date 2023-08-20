<div align=center>
	<h1>BenchClearing_App</h1>
</div>
<br>
<div align=center>
	<h3>📚 Tech Stack 📚</h3>
	<p>✨ Platforms & Languages ✨</p>
</div>
<div align="center">
	<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Conda-Forge&logoColor=white" />
	<img src="https://img.shields.io/badge/springboot-6DB33F?style=flat&logo=Spring Boot&logoColor=white" />
	<img src="https://img.shields.io/badge/Oracle%20SQL-F80000?style=flat&logo=Oracle&logoColor=white" />
  <br>
	<img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" />
	<br>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
	<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" />
</div>
<br>
<div align=center>
	<p>🛠 Tools 🛠</p>
</div>
<div align=center>
	<img src="https://img.shields.io/badge/Tomcat-F8DC75?style=flat&logo=ApacheTomcat&logoColor=white" />
	<img src="https://img.shields.io/badge/Intellij IDEA-0000FF?style=flat&logo=IntellijIDEA&logoColor=white" />
	<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />
	<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
</div>

## 목차

- [프로젝트 소개](#----------)
- [프로젝트 주요 기능](#-------------)
- [ERD](#-stars--erd)
- [팀원](#-stars----)
- [개발 기간](#-stars-------)
- [개발 환경](#-stars-------)
- [빌드](#-stars----)


### 프로젝트 소개

실시간 야구 중계 공유, 경기일정, 선수 스탯 확인 등이 가능한 통합형 야구 커뮤니티 중개 플랫폼입니다.


### 프로젝트 주요 기능

- 사이트 자체 회원가입시 문자 및 이메일 인증(Naver Cloud Platform Sens api, Java Mail api)
- jwt(Java Web Token)과 이용해 보안 성능 향상
- 사용자 편의를 위한 게시글 및 뉴스 페이지 12개 단위 조회 및 페이지네이션(직접 구현)
- 글 작성시 이미지 업로드(firebase)
- 각 계시글를 카테고리별, 최신순 확인 가능
- 크롤링(Crawling) 사용해 실시간 뉴스 정보 업데이트

### ERD
- (https://www.erdcloud.com/d/reJwcgghTte6jgdpJ)

### 팀원
- 허식 (https://github.com/tromxx)
- 김준혁 (https://github.com/kimchoker)
- 고태훈 (https://github.com/koth1999)

### 개발 기간
- 기획 : 2022.05.04 - 2022.05.10
- 개발 : 2022.05.10 - 2022.05.26

###  개발 환경
- OS : Window 10
- IDE : VS Code, IntelliJ
- Language : Java, Javascript
- FrontEnd : HTML/CSS
- Library : ReactJS
- DB : JDBC, Oracle
- Server : Tomcat

###  빌드

```sh
./gradlew build -x test
```
```sh
java -jar build/libs/Mini_Project_Backend-0.0.1-SNAPSHOT.jar
```
터미널에서 테스트 제외하고 gradle 빌드 실행한 후 위의 명령어로 파일 실행
