# Contributing to DeveloFolio

디벨로폴리오에 관심을 가져주셔서 감사합니다.

> 해당 문서는 디벨로폴리오에 기여하고자 하는 분들을 위한 가이드 문서이며 Mac 환경을 고려하여 작성되었습니다.

## 개발환경 설정

### 설치

```bash
# 리포지토리 받기
# 만약 PR을 작성하고 싶으면 fork를 하고 clone 해주세요.
$ git clone git@github.com:ChoJongHoon/develofolio.git
$ cd develofolio

# 의존성 설치
$ yarn
```

### `.env` 설정

- `/pacakges/client`
- `/pacakges/server`

각 폴더에 있는 `.env.example` 파일을 복사하여 같은 위치에 `.env` 파일을 생성합니다.

### PostgreSQL 설치

먼저 로컬에 DB 설치가 필요합니다. postgresql을 설치하고 접속해주세요.

```bash
# 설치
$ brew install postgresql

# 실행
$ brew services start postgresql

# 접속
$ psql postgres
```

### DB 설정

편의를 위해 ID와 비밀번호를 `test`로 만들어줍니다.

> 보안을 위해 변경하고 싶으시다면 `/packages/server/.env` 파일도 같이 수정해주어야 합니다.

```sql
CREATE ROLE test WITH LOGIN PASSWORD 'test';
```

이제 database 를 생성하고 방금 생성한 유저에게 권한을 부여합니다.

```sql
# database 생성
CREATE DATABASE develofolio;

# 권한 부여
GRANT ALL PRIVILEGES ON DATABASE develofolio TO test;

# 종료
exit;
```

이제 DB 설정을 마쳤습니다.

### DB 마이그레이션

database에 필요한 테이블을 생성하기 위해 아래 명령어를 입력해줍니다.

```bash
$ yarn workspace server typeorm migration:run
```

### 실행

이제 실행하면 됩니다. 아래 명령어를 통해 server와 client를 동시해 실행할 수 있습니다.

```bash
$ yarn dev
```

**Happy Coding!**

> **\* 주의**
>
> `.env`파일의 모든 설정을 공개할 수 없습니다. 특히 AWS 및 일부 OAuth App의 키를 공개할 수 없어 특정 기능이 제한됩니다. 제한되는 기능은 다음과 같습니다.
>
> - Google로 로그인
> - 파일 업로드
