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

## 대원칙: 디자인 요소는 절대 바꾸지 않는다

**Figma에 있는 디자인 요소(글자/문구, 이미지, 색감)는 하나도 바꾸지 않는다.** 디자인에 없는 UI도 추가하지 않는다.

- 문구, 색상, 굵기, 그라디언트, 이미지는 `get_design_context` 결과를 그대로 쓴다.
- 문구에 오타가 있어도 그대로 넣고, 사용자에게 따로 알린다. 2160 원본과 1280 프레임의 문구가 다르면 **1280 프레임**을 따른다(사용자가 수정하는 쪽).
- **크기와 비율은 보기 좋게 조정해도 된다.** Figma에는 데스크톱만 있으니 태블릿과 모바일 반응형은 직접 설계한다.
- 구현한 뒤에는 브라우저에서 데스크톱 수치를 측정해 Figma와 비교하고, 태블릿과 모바일 화면도 확인한다.

## 케이스 스터디 구현 방식 (디자인 단위)

Figma 섹션 프레임은 **2160px 원본**이고, 옆에 있는 **1280px 프레임은 원본을 정확히 1280/2160배로 줄인 사본**이다. 그래서 웹에서는 비율로 구현한다.

- `.case-page`가 `container-type: inline-size`이고, `--u = min(100cqw / 2160, 1px)`이 디자인 1px이다.
- 모든 값은 `calc(var(--u) * <Figma 2160 기준 값>)`으로 쓴다. 예: 제목 90px → `calc(var(--u) * 90)`
- 화면 너비 1280px에서는 1280 프레임과, 2160px 이상에서는 원본과 같다.
- 섹션 공통 클래스 `.case-sec`: 좌우 패딩 298 (콘텐츠 너비 1564), 최대 너비 2160px
- 열 너비나 간격처럼 항목마다 다른 값은 인라인 CSS 변수(`--w`, `--gap`)로 넘긴다.
- 반응형:
  - 태블릿(810–1279px): `--u` 하한 0.6px, 좌우 여백 48px, 가로로 긴 배치(Overview 열, Summary 카드)는 2열
  - 모바일(~809px): 읽기 좋은 고정 px 값, 세로 배치, `word-break: keep-all`
- 공통: `CaseEyebrow`(별 아이콘 + 라벨), 섹션 제목 `.case-h2`(70px), `CaseHero`, `CaseOverview`, `CaseSummary`, `CaseWhyHow`, `CaseJourney`, `CaseDeepDive` + `DeepDiveCompare`(AS IS / TO BE + 화면) / `DeepDiveStat`(그라디언트 수치) / `DeepDivePriority`(우선순위 표) / `DeepDiveTrials`(실패한 시도 카드, 카드 너비 기준 단위) / `DeepDiveSpecCard`(그림 위 겹침 카드, `overlay`로 전달), `CaseRetro`(어두운 결과·회고 + Next Project, 다음 slug는 `nextSlug` prop), 줄 높이 100 제목 `.case-h2.is-tight`

## 현재 작업: Ellm 케이스 스터디 (`/case-studies/ellm`)

Figma 파일 `2wduPMxRCf5SwSUCNYqvbl`, 캔버스 **"framer 이전용"** (node `125:55403`)

| # | 섹션 | 2160 node | 1280 node | 상태 |
| --- | --- | --- | --- | --- |
| 01 | Hero | `126:55427` | 없음 | 완료 |
| 02 | Overview | `126:62652` | `126:62655` | 완료 |
| 03 | Summary | `126:57665` | `126:62671` | 완료 |
| 04 | Why and How | `126:56068` | `126:62729` | 완료 |
| 05 | UserJourney (수정본 UserJourney 3) | `147:50863` | 없음 | 완료 |
| 06 | DeepDive01 프로젝트 탐색 | `126:56301` | `126:63419` | 완료 |
| 06 | DeepDive02 문서 생성 | `126:57131` | `126:75473` | 완료 |
| 07 | DeepDive03 답변 생성 대기 | `126:56943` | `126:78288` | 완료 |
| 08 | 관리자 페이지 (수정본, 제목 번호·사양서 글머리 기호) | `147:52003` | 없음 | 완료 |
| 09 | 회고 및 정리 (Next Project 포함) | `126:56881` | `126:80618` | 완료 |

- **Figma MCP는 Starter 플랜 한도(월 20회)를 다 써서, 06부터는 Figma REST API를 쓴다.**
  - 토큰: `~/.config/figma/token` (권한 600, 저장소 밖에 둔다). 헤더 `X-Figma-Token: $(cat ~/.config/figma/token)`
  - 노드: `GET https://api.figma.com/v1/files/<fileKey>/nodes?ids=<id,id>`
  - 이미지: `GET https://api.figma.com/v1/images/<fileKey>?ids=<id>&scale=2&format=png`
  - 토큰 권한이 file_content:read라서 `/v1/me`는 403이 나지만 정상이다.
  - REST API도 Starter 플랜은 한도가 낮다. 429가 나면 `retry-after` 헤더(초)만큼 기다려야 한다. 그동안 MCP 한도가 풀려 있으면 MCP를 쓰고, 둘 다 막히면 사용자에게 Figma에서 직접 Export(PNG 1x)를 부탁한다.
### 멀티 AI 워크스페이스 (`/case-studies/lumix`, `app/case-studies/lumix.tsx`)

PNG가 없으면 SVG를 Pretendard를 불러온 브라우저에서 그려 참고 이미지로 쓴다(SVG에 SemiBold 굵기가 빠지므로 제목 굵기는 다른 섹션 기준으로 판단). Figma 한도 때문에 사용자가 내보낸 파일(프로젝트의 `design-src/`: SVG + PNG 2x, git 제외)로 작업한다. SVG는 "Outline text"를 해제해 내보내야 문구와 글꼴 크기가 `<text>`로 남는다(SemiBold 굵기는 빠지므로 PNG로 확인). 글자가 윤곽선이면 **문구는 PNG를 보고 옮기고, 위치와 크기는 SVG 도형(rect) 좌표로 측정한다.**

| # | 섹션 | node | 상태 |
| --- | --- | --- | --- |
| - | cover image (홈 썸네일) | `163:158533` | 완료 |
| 01 | Hero (Ellm Hero와 같은 템플릿, 그라디언트 별 아이콘, 강조색 #5476FE) | `163:158413` | 완료 |
| 02 | Overview (Ellm Overview 템플릿, 아래 여백 69) | `163:158647` | 완료 |
| 03 | Summary (카드 2~4 그라디언트는 SVG 값이 PNG와 달라 PNG 실측 색으로 만든 `summary-card-grad-*.svg` 사용) | `163:158592` | 완료 |
| 04 | Why (`CaseWhyGrid`: 왼쪽 강조 카드 + 오른쪽 문제 행, 배경 이미지) | `163:158663` | 완료 |
| 05 | 프로젝트 탐색 = Key Screen 1 Multi Chat (`CaseDeepDive` + `DeepDivePanel`, 목업은 2x PNG에서 잘라낸 이미지) | `163:159138` | 완료 |
| 06 | security ux = Key Screen 2 (`CaseGlassCards`: 어두운 배경 + 유리 카드 3장, 목업은 2x PNG에서 잘라냄) | `163:158996` | 완료 |
| 07 | admin console = Key Screen 3 (`CaseDeepDive` + `DeepDiveCompare`(Design) + `DeepDivePatterns`, 모바일은 왼쪽 화면만 잘라 표시) | `163:159388` | 완료 |
| 08 | landing page (`CaseLanding`: 세로 랜딩 화면 + 제품→랜딩 요소 대응표 + 아래 유리 장식 이미지, 사용자가 준 고해상도 원본에서 5422px로 만든 `landing-bg.webp`) | `163:158691` | 완료 |
| - | 하단 = Next Project (`CaseNext`, Ellm 회고 섹션과 공유, 위 여백 90) | `163:159740` | 완료 |

### 다크모드, RTL 다국어 디자인 시스템 구축 (`/case-studies/design-system`, `app/case-studies/design-system.tsx`)

페이지 전체가 어두운 바탕(#0E0E0E)이다. 레지스트리에 `theme: "dark"`를 주면 `.case-page.is-dark`가 붙고, 섹션 컴포넌트의 어두운 바탕용 색(설명 #EEEEEE, 태그 #404040, 내비 어두운 유리)이 적용된다. 강조색은 주황 그라디언트(#FA5730 → #FCA25F, `star-orange.svg`, CaseHero `pointGradient`). 사용자가 내보낸 SVG(글자 포함) + PNG **4x**로 작업한다.

| # | 섹션 | 상태 |
| --- | --- | --- |
| - | cover image (홈 썸네일) | 완료 |
| 01 | Hero (Ellm Hero 템플릿, 아래 여백 156, 커버 1564×1173) | 완료 |
| 02 | Overview (멀티 AI 워크스페이스 Overview와 같은 배치, 내용 #C1C1C1, 구분선 #525252) | 완료 |
| 03 | Summary (어두운 카드 그라디언트 + #727272 테두리, 1번 카드 점무늬 이미지, 행 간격 26·제목 간격 28) | 완료 |
| 04 | Why = Problem & Solution 1 (`CaseProblemSolution`: 검은 바탕 + 사선 무늬, 문제 카드·색 견본은 HTML, 토큰 표·화면은 4x PNG에서 잘라냄) | 완료 |
| 05 | Problem & Solution 2 (`CaseContrast`: 대비 견본 3장 + 반복 작업 카드 / `CasePlugin`: 검은 바탕, Contrast Checker 화면(4x PNG에서 잘라냄) + 단계 01~03, Why와 같은 사선 무늬를 180° 회전) | 완료 |
| 06 | RTL & Result (`CaseRtl`: 위 화면 그림 + 원칙 카드 3장(HTML) + 작성 규칙·타이포 표 그림, 그림은 4x PNG에서 잘라냄) | 완료 |
| 07 | 결과 및 회고 + Next Project | |

- 섹션 프레임 하나를 통째로 `get_design_context`하면 결과가 너무 커서 메타데이터만 돌아온다. 하위 frame 단위로 나눠서 호출한다.
- 섹션 컴포넌트는 `app/components/case-study/Case*.tsx`, 프로젝트별 내용은 `app/case-studies/<slug>.tsx`, slug 등록은 `app/case-studies/index.ts`에 한다.
- 복잡한 UI 목업은 Figma에서 2배(`defaultScale: 2`) PNG로 내보내 `public/projects/<slug>/`에 둔다. 예: Hero 커버 3128×2010
- **상단 섹션 내비게이션 `CaseNav`**: 디자인이 있는 케이스 스터디에서는 기본 탭(Projects/About/Resume) 대신 표시한다. 스타일은 https://josuyeon.framer.website/case-studies/ellm 헤더를 참고했다.
  - 항목은 `app/case-studies/<slug>.tsx`의 nav 배열(예: `ellmNav`)에서 `{ id, label, also? }`로 정의하고, 섹션 컴포넌트에 같은 `id`를 넘긴다. 새 섹션을 만들면 여기에 항목도 추가한다.
  - 스크롤 위치에 따라 현재 섹션을 강조한다. `.case-page`가 `container-type`이라 fixed 기준이 바뀌므로 `CaseNav`는 `.case-page` 바깥에 렌더링한다.
- 가로로 아주 긴 그림은 모바일에서 `DeepDiveCompare`의 `mobileCrop={{ aspect, x }}`로 핵심 부분만 잘라 크게 보여 준다 (예: 관리자 AS IS 지표 목록).
- 사용자 요청으로 Figma와 다르게 바꾼 것: Summary 회색 카드 3개는 모두 두 번째 카드(68%↓) 그라디언트를 쓴다 (Figma 3·4번 카드 그라디언트는 색 지점이 뒤섞여 대각선 줄무늬가 생김).
- 디자인이 있는 페이지는 라우트에서 TOC나 Next 카드를 덧붙이지 않는다. Next Project도 09 섹션 디자인대로 그린다.

## 인터랙션

과하지 않게, 화면에 들어올 때 한 번만 짧게 움직인다. `prefers-reduced-motion: reduce`이면 모두 끈다.

- **등장(Reveal)**: `app/hooks/useReveal.ts`의 `REVEAL_SELECTOR` 요소가 화면 진입 시 16px 아래에서 나타난다. 1.2초 동안 나타나고, 같이 들어온 요소는 180ms 간격(최대 1100ms)으로 순서대로 나타난다. 페이지 첫 화면은 200ms 뒤에 시작한다.
  - 첫 페인트 전에 숨기려고 `root.tsx`의 `<head>` 스크립트가 `<html>`에 `.js`를 붙이고, `global.css` "Reveal" 블록이 같은 선택자로 숨긴다. **선택자를 바꾸면 두 곳을 함께 수정한다.**
  - 홈(`home.tsx`)과 케이스 스터디(`case-study.tsx`)에서 `useReveal()`을 호출한다.
- **숫자 카운트업**: `app/components/CountUp.tsx` (기본 2초). 미리 렌더링된 HTML에는 최종 숫자가 들어가고, 최종 숫자 폭으로 자리를 고정해 옆 글자가 흔들리지 않는다.
- **상단 내비 알약**: `CaseNav`의 `.case-nav__indicator`가 현재 항목으로 미끄러지듯 이동한다.
- **홈 카드 호버**: 카드 테두리는 그대로 두고 안의 이미지만 1.03배 확대한다.
- **홈 카드 한 줄 배치 (`features.homeRow`)**: 프로젝트 카드 4장을 히어로 아래 가로 한 줄로 둔다(모바일은 2열 2줄). 카드 너비는 히어로 아래 남은 높이에 맞춰 4장이 한 화면에 들어오게 정한다. 마우스를 올린(또는 키보드 포커스) 카드는 8px 떠오르며 푸른 빛 테두리가 생기고, 나머지 카드는 흐려진다(`app/styles/home-row.css`). `false`면 기존 2열 목록.
- **홈 어두운 배경 (실험, `feature/home-beam` 브랜치)**: https://josu.framer.website 첫 화면을 참고한 어두운 남색 바탕 + 대각선 파란 빛줄기. 직접 만든 WebGL 셰이더(`app/components/HomeBeam.tsx`)이고, 원본과 같은 기법(사인파 난류로 좌표를 비틀고 Oklab 팔레트 #00001A→#2962FF→#0044FF로 칠함)과 같은 설정값(speed 0.25 — 원본 0.4보다 느리게, scale 0.6, turbAmp 0.6, turbFreq 0.1, iter 7, waveFreq 2, seed 648에서 GPU로 읽은 상수)으로 직접 작성해 원본과 같은 장면·속도로 일렁인다. 원본처럼 마우스에는 반응하지 않고, 위→아래 검은 그라디언트를 덮는다. 캔버스 높이는 원본처럼 화면 너비의 약 0.88배. 홈에서는 프로필 사진 자리(빈 원)를 숨긴다. 홈 글꼴은 Pretendard 하나로 통일하고 크기는 64/20/18/15/13 단계만 쓴다. 화면 밖·숨은 탭에서는 멈추고, 동작 줄이기 설정이면 정지 화면 한 장, WebGL이 없으면 CSS 그라디언트를 보여 준다.
  - 스타일은 `app/styles/home-beam.css`에 모았고 모두 `.page.is-home-beam` 아래에서만 적용된다 (`root.tsx`가 홈에서 이 클래스를 붙인다).
  - **되돌리기**: `app/data/features.ts`의 `homeBeam`을 `false`로 바꾸면 기존 밝은 홈으로 돌아간다. 완전히 지우려면 위 두 파일과 `features.ts`, `root.tsx`/`home.tsx`의 관련 줄을 지운다.

## 컨벤션

- UI 텍스트와 코드 주석은 한국어로 쓴다.
- 커밋 메시지는 영어 명령문으로 쓴다 (예: `Set site URL to Vercel deployment`).
- 페이지마다 `meta` export에서 `pageMeta()`를 사용한다.
