FROM node:12.18.4

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

COPY . .
CMD ["npm", "start"]

# 볼륨이 디스크 연결해주는 부분.
# 1. Heroku 계정 만들기
# 2. 현재 작업하고 있는 FE 프로젝트를 GithubAction 을 사용해서 heroku에 배포하기