# Game Server Project

## 소개

NestJS연습을 위한 게임 서버 프로젝트입니다.
NestJS와 TypeScript를 사용하여 게임 관련 API를 구축하는 프로젝트입니다.
이 프로젝트는 사용자 인증 및 게임 기록 관리를 포함합니다.

## 기술 스택

- **언어**: NestJS, TypeScript
- **데이터베이스**: PostgreSQL
- **ORM**: TypeORM

<!-- MEMO -->
<!-- MEMO -->
<!-- MEMO -->
<!-- MEMO -->

## Entity

- **User**: 사용자 정보

  - `id`: 사용자 ID (Primary Key)
  - `username`: 사용자 이름
  - `password`: 사용자 비밀번호 (해시된 값)
  - `createdAt`: 생성일시
  - `updatedAt`: 수정일시

- **GameSession**: 게임 정보
  - `id`: 게임 기록 ID (Primary Key)
  - `userId`: 사용자 ID (Foreign Key)
  - `gameName`: 게임 이름
  - `level`: 게임 레벨
  - `score`: 게임 점수
  - `duration`: 게임 소요 시간
  - `createdAt`: 생성일시
  - `updatedAt`: 수정일시

## API (controller)

POST /auth/signup
POST /auth/signin

GET /user
GET /user/:id
PATH /user/:id
DELETE /user/:id

## service

### Auth

- POST /auth/signup
  - USER: findbyusername
  - USER: createUser
- POST /auth/signin
  - USER: findbyusername

### user
- GET /user
- GET /user/:id
- PATH /user/:id
  - updateUser
- DELETE /user/:id
  - delete
