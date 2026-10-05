import { site } from "./site";

/** 페이지별 제목/설명/OG 태그. 링크 공유 미리보기에 사용됩니다. */
export function pageMeta({
  title,
  description = site.intro,
  path = "/",
  image = "/og.png",
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
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
