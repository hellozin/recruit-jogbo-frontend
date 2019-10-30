# recruit-jogbo-frontend

Vue.js를 사용한 Recruit Jogbo의 Frontend 서버입니다.

## Project Build

Dockerfile이 있는 폴더에서 아래 명령어를 실행합니다.

```
docker build -t recruit-jogbo-frontend .
```

## Project Run

Dockerfile이 있는 폴더에서 아래 명령어를 실행합니다.

```
docker run -p 8080:80 recruit-jogbo-frontend
```