import { site } from "./site";

/** 페이지별 제목/설명/OG 태그. 링크 공유 미리보기에 사용됩니다. */
export function pageMeta({
  title,
  description = site.intro,
  path = "/",
  image = "/og.jpg",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: site.url + path },
    { property: "og:image", content: site.url + image },
    // 기본 공유 이미지(/og.jpg)는 홈 첫 화면을 1200×630으로 찍은 것
    ...(image === "/og.jpg"
      ? [
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: site.url + image },
  ];
}
