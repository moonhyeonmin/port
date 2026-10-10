/**
 * 실험 중인 화면 기능 스위치.
 * false로 바꾸면 해당 기능을 넣기 전 화면으로 돌아간다 (코드와 스타일은 그대로 남는다).
 */
export const features = {
  /**
   * 홈 화면 어두운 배경 + 파란 빛줄기 인터랙션 (josu.framer.website 첫 화면 참고).
   * 관련 파일: components/HomeBeam.tsx, styles/home-beam.css, root.tsx(is-home-beam 클래스)
   */
  homeBeam: true,
  /**
   * 홈 프로젝트 카드를 한 줄 가로 띠로 천천히 흘려 보여준다 (false면 기존 2열 카드 목록).
   * 관련 파일: components/HomeMarquee.tsx, styles/home-marquee.css
   */
  homeMarquee: true,
};
