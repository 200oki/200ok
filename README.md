# 🌳 되어봐요 숲잘알!
<!-- - 최종 서비스의 한 줄 소개를 작성하세요. -->
[바로 가기](http://elice-kdt-ai-4th-team04.elicecoding.com)

## 프로젝트 기간
2022-04-19 ~ 2022-05-07

<!-- ## 프로젝트 구성 안내

* `bullet point 에 적힌 내용을 수정해 주시면 됩니다.`

* `초기 기획은 언제든 수정될 수 있으니 웹서비스 결과를 내는데 초점을 두시기 바랍니다.` -->

## 1. 프로젝트 소개

### `사용한 데이터`
- [주민 데이터](https://www.kaggle.com/datasets/prasertk/animal-crossing-new-horizons-with-image-url?select=posters.csv)
- [주민 사진 데이터 셋](https://www.kaggle.com/code/jahysama/animal-crossing-nightmare-fuel-villagers)
- [주민 인기도 데이터](https://www.kaggle.com/datasets/ampiiere/acnh-villager-popularity)

### `기술 스택`
  - 프론트엔드 : Javascript + React
  - 백엔드 : Express + MongoDB

### `사용 라이브러리`
  
**프론트엔드**
  - 공유하기 : react-copy-to-clipboard, react-toasify
  - WYSIWYG(게시판 텍스트 에디터) : draft.js, draft-js-plugins
  - css : mui, progress
  - 차트 : Chart.js Recharts

**백엔드**
  - 로그 관리 : Morgan, Winston, Winston-daily-rotate-file
  - 유효성 검사 : express-validator
  - UUID 생성 : crypto
  - MongoDB ODM : Mongoose
  - API 문서 : [Swagger](http://elice-kdt-ai-4th-team04.elicecoding.com/api/docs/)

<!-- **어떠한 데이터셋와 도구 및 기술을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**
  - 웹서비스에 대한 자세한 개요 -->

## 2. 프로젝트 목표

**데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제에 대한 논의 (50자 이상)**
  - 프로젝트 아이디어 동기
  - 문제를 해결하기 위한 특정 질문 명시
  - 데이터를 통해 탐색하려는 문제를 구체적으로 작성


## 3. 프로젝트 기능 설명

### `메인 기능`
  - 나와 잘 어울리는 주민 추천 테스트
  - 카드 뒤집기 미니 게임 
  - 동물의 숲 위키
  - 주민 생일 달력
  - 자유 게시판

### `서브 기능`
  - 오늘 생일인 주민에게 축하 댓글 남기기
  - 테스트, 미니 게임 공유하기, 댓글 남기기
  - 주민 통계 차트
  - 방명록 


### `프로젝트만의 차별점, 기대 효과`
누구나 동물의 숲 주민이 될 수 있다는 모토로 회원가입 기능을 지원하지 않고 있습니다. <br>
동물의 숲을 플레이해본 유저들에게 향수를 불러일으키고, <br>
플레이해보지 않았다면 매칭 테스트 & 미니 게임을 통해 동물의 숲을 몰라도 즐길 수 있게 합니다.


## 4. 프로젝트 구성도
[Wireframe](https://www.figma.com/file/ZaDFSChJRzw85ml4r8tA1u/wireframe)

## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| [권민지](https://github.com/kminzy) | 프론트엔드 |
| [신광천](https://github.com/Shin-GC) | 백엔드 |
| [안지우](https://github.com/JiwooAn) | 백엔드 / 팀장 |
| [윤성준]() | 백엔드 / 데이터 분석 |
| [이창민]() | 프론트엔드 |
| [홍지운]() | 프론트엔드 |

<!-- **멤버별 responsibility**

1. 팀장 

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정

2. 프론트엔드 

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정

 3. 백엔드 & 데이터 담당  

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정 -->

## 6. 버전
  - 1.0.0

## 7. FAQ
**Q. 글/댓글 삭제 기능은 없나요?**
  - 글 작성 시 비밀번호를 같이 입력받아 삭제할 때 비밀번호를 입력하면 삭제 가능하도록 기능을 추가할 예정입니다 :)
 
