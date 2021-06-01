import { React } from "pagic";

const root = Deno.env.get("URL") ?? "https://uki00a.github.io/blog/";

export default {
  srcDir: "./src",
  root,
  title: "uki00a.github.io",
  description: "uki00a.github.io",
  /*
  theme: "blog",
  plugins: ["blog"],
  */
  head: (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css"
      />
      <link
        rel="icon"
        href="https://raw.githubusercontent.com/uki00a/blog/master/src/assets/favicon.ico"
      />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png"
      />
    </>
  ),
  blog: {
    root: "/articles",
    social: {
      github: "uki00a",
      email: "uki00a@gmail.com",
      twitter: "uki00a",
    },
  },
  tools: {
    editOnGitHub: true,
    backToTop: true,
  },
  md: {
    tocEnabled: true,
  },
  /*
  nav: [
    {
      text: "ホーム",
      link: root,
      icon: "czs-home-l",
    },
    {
      text: "タグ一覧",
      link: `${root}tags`,
      icon: "czs-tag-l",
    },
    {
      text: "カテゴリ一覧",
      link: `${root}categories`,
      icon: "czs-category-l",
    },
    {
      text: "アーカイブ",
      link: `${root}archives`,
      icon: "czs-box-l",
    },
    {
      text: "このサイトについて",
      link: `${root}articles/001-about-this-blog.html`,
      icon: "czs-about-l",
    },
  ],
  */
};
