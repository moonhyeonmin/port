# josuyeon 포트폴리오

UX/UI 디자이너 포트폴리오 사이트. Framer Tabfolio 템플릿(https://josuyeon.framer.website) 레이아웃을 기반으로 React Router로 다시 구현하고 있다.

## 주소

| 항목 | URL |
| --- | --- |
| 배포 (Vercel) | https://port-five-peach-95.vercel.app |
| GitHub | https://github.com/moonhyeonmin/port (브랜치 `main`) |
| 참고 템플릿 (Framer) | https://josuyeon.framer.website |
| Figma 디자인 | https://www.figma.com/design/2wduPMxRCf5SwSUCNYqvbl/2026%25EB%2585%2584-%25ED%2595%2598%25EB%25B0%2598%25EA%25B8%25B0?node-id=125-55403 |

배포 URL을 바꾸면 `app/data/site.ts`의 `url`도 함께 바꾼다. OG 태그의 절대 경로가 이 값으로 만들어진다.

## 기술 스택

- **React Router v8** (framework mode, `@react-router/dev`)
- **React 19**, **TypeScript 5** (strict)
- **Vite 8**
- 스타일: 순수 CSS 하나(`app/styles/global.css`)와 CSS 변수 토큰. Tailwind나 CSS-in-JS는 쓰지 않는다.
- 폰트: Manrope(Google Fonts)와 Pretendard Variable(jsDelivr). `app/root.tsx`의 `links`에서 불러온다.
- 배포: Vercel 정적 호스팅

## 렌더링 방식

`react-router.config.ts` 설정이 `ssr: false`와 `prerender`이다. 런타임 서버 없이 빌드할 때 모든 페이지를 HTML로 생성한다.

- `loader`는 **빌드(prerender) 시점에만** 실행된다. 런타임 API 호출은 넣지 않는다.
- 새 라우트나 새 프로젝트 slug를 추가하면 `prerender` 목록에 포함되는지 확인한다. 케이스 스터디는 `projects` 배열에서 자동으로 들어간다.
- `vercel.json`: `build/client`를 서빙하고, 그 밖의 경로는 `/__spa-fallback.html`로 rewrite한다.

## 명령어

```bash
npm install
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 → build/client
npm run preview    # 빌드 결과 미리보기
npm run typecheck  # 라우트 타입 생성 + tsc
```

## 디렉터리 구조

```
app/
  root.tsx              # HTML 레이아웃, 폰트, TabNav/Footer, ErrorBoundary
  routes.ts             # 라우트 정의
  routes/
    home.tsx            # /            히어로 + 프로젝트 카드 목록
    about.tsx           # /about
    resume.tsx          # /resume
    case-study.tsx      # /case-studies/:slug  케이스 스터디 상세
  components/
    TabNav.tsx          # 상단 탭 (Projects / About / Resume)
    ProjectCard.tsx     # 4:3 썸네일 카드 (이미지 또는 mp4)
    Footer.tsx
  data/
    site.ts             # 이름, 소개, 이메일, 사이트 URL  ← TODO: 실제 정보로 교체
    projects.ts         # 프로젝트 목록 (slug, title, company, year, tone, thumbnail)
    meta.ts             # pageMeta(): 페이지별 title/description/OG 태그
  styles/global.css     # 디자인 토큰 + 모든 스타일
public/                 # 정적 에셋 (favicon, 썸네일, og.png 등)
```

- import 별칭은 `~/*` → `app/*`이다.
- 라우트 타입은 `./+types/<route>`에서 가져온다. `react-router typegen`이 `.react-router/`에 생성한다.

## 디자인 토큰 (global.css `:root`)

- 색상: `--color-text #04111f`, `--color-muted #717880`, `--color-bg #fcfcfc`, `--color-accent #4513eb` 등
- 카드 톤: `violet` / `lime` / `sky` / `gray` (`--tone-*`)
- 컨테이너: `--container 1280px`, `--gutter` 40 / 32 / 16px
- 브레이크포인트: 모바일 ~809px / 태블릿 810–1279px / 데스크톱 1280px~

새 스타일은 하드코딩 값 대신 기존 토큰을 먼저 쓰고, 필요하면 `:root`에 토큰을 추가한다.

## 현재 작업: Figma 케이스 스터디 구현

Figma 파일 `2wduPMxRCf5SwSUCNYqvbl`의 **"framer 이전용"** 캔버스(node `125:55403`)에 있는 Project 1 **Ellm 기업용 Private LLM** 디자인을 `/case-studies/ellm` 페이지로 구현한다.

디자인의 섹션 구성:
1. **Hero** (`Ellm_01_Hero`): "보안 기업의 첫 LLM, UI로 신뢰를 증명하다", 태그, 대시보드 목업
2. **Why & How**: "선례도, 신뢰도 없이 시작했습니다"와 키워드(사용자 리서치, 프로토타입 검증, depth 단순화, Wizard UI)
3. **Deep Dive**: 프로젝트 탐색(카드 → 테이블 + 필터), 관리자 대시보드(38개 지표 → 3개 그래프 유형), 답변 생성 대기(Spinner → Skeleton → 생각 과정 표시) 등
4. **Retrospective**: 결과 지표(예: 4.2/5.0 신뢰도), 회고 (다크 네이비 배경)
5. **Next Project**: 멀티 AI 워크스페이스

작업 방법:
- 캔버스가 매우 커서(4223×21514) 전체 `get_metadata` 결과는 토큰 한도를 넘는다. **섹션 frame 단위**로 `get_design_context` / `get_screenshot`을 호출한다.
- Figma MCP 결과로 받은 코드는 그대로 붙이지 않는다. 이 저장소의 방식(순수 CSS + 토큰, `~/` 별칭, 데이터는 `app/data`)에 맞춰 옮긴다.
- 이미지와 영상 에셋은 `public/projects/<slug>/` 아래에 둔다.
- 현재 `case-study.tsx`는 모든 프로젝트가 같은 플레이스홀더 섹션(Overview~Lessons)을 공유한다. Ellm처럼 디자인이 따로 있는 프로젝트는 slug별 콘텐츠 컴포넌트로 분리하는 방향을 고려한다.

## 컨벤션

- UI 텍스트와 코드 주석은 한국어로 쓴다.
- 커밋 메시지는 영어 명령문으로 쓴다 (예: `Set site URL to Vercel deployment`).
- 페이지마다 `meta` export에서 `pageMeta()`를 사용한다.
