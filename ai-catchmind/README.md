## 🚀 설치 및 실행 방법

### 1. 사전 준비

프로젝트 실행 전에 아래 프로그램을 설치해야 합니다.

- **Node.js** (권장: LTS 버전): [Node.js 다운로드](https://nodejs.org/)

설치 후, 터미널에서 설치된 버전을 확인

```bash
node -v  # Node.js 버전 출력
npm -v   # npm 버전 출력
```

### 2. 프로젝트 설치

원격 레포지토리 클론 후, `feat-1/FE` 브랜치를 로컬로 가져오고 체크아웃

```bash
git clone <https://github.com/beom-jo-city/catch_mind.git
# 클론할 폴더 IDE에서 불러오기
git checkout -b feat-1/FE origin/feat-1/FE  # feat-1/FE 브랜치를 로컬로 가져오고 체크아웃
cd ai-catchmind     # React 프로젝트
```

의존성 설치 - `package.json`에 정의된 모든 패키지를 설치

```bash
npm install
```

웹 서버 실행

```bash
npm start
```

명령 실행 후 기본 브라우저가 자동으로 열리며, [http://localhost:3000](http://localhost:3000)에서 확인 가능

## 📂 프로젝트 구조

프로젝트의 주요 폴더와 파일 구조는 다음과 같습니다.

```csharp
ai-catchmind/
├── src/               # 애플리케이션의 주요 소스 코드가 위치
│   ├── components/    # React 컴포넌트
│   ├── pages/         # 페이지 단위 컴포넌트
│   ├── styles/        # CSS 또는 스타일 관련 파일
│   └── index.js       # 앱의 진입점
├── public/            # 정적 파일 (HTML, 이미지 등)
│   └── index.html     # 메인 HTML 파일
├── package.json       # 의존성 및 스크립트 정의
├── package-lock.json  # 의존성 버전 고정 파일
└── README.md          # 프로젝트 설명 파일
```

- `src/` 폴더: 프로젝트의 핵심 코드가 위치합니다. React 컴포넌트, 스타일 파일 등을 포함합니다.
- `public/` 폴더: 정적 리소스가 저장됩니다. 여기 있는 파일은 npm start 실행 시 브라우저에 그대로 노출됩니다.
- `package.json` 파일: 프로젝트 의존성과 실행 가능한 스크립트(npm start, npm install 등)가 정의되어 있습니다.
