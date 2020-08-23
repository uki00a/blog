import { React, PagicLayout } from "./_deps.tsx";

const URL = "https://https://uki00a.github.io/blog"; // TODO ローカル環境では`http://localhost:<port>`を設定できるようにする
const TOP_PAGE = "index.html";
const DEFAULT_DESCRIPTION = "uki00a.github.io";
const SITE_IMAGE = "avatar.png";

const Layout: PagicLayout = ({
  outputPath,
  title,
  content,
}) => {
  const linkToTopPage = `${URL}/${TOP_PAGE}`;
  const favicon = `${URL}/assets/favicon.ico`;
  const ogImage = `${URL}/assets/${SITE_IMAGE}`;
  const ogType = outputPath.endsWith(TOP_PAGE) ? "website" : "article";
  const ogDescription = DEFAULT_DESCRIPTION; // TODO ページごとにdescriptionを変える

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@uki00a" />
        <meta name="twitter:creator" content="@uki00a" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1/new.min.css"></link>
        <link rel="icon" href={favicon}></link>
      </head>
      <body>
        <header>
          <div>
            <a href={linkToTopPage}>uki00a.github.io</a>
          </div>
        </header>
        <main>
        {content}
        </main>
      </body>
    </html>
  );
};

export default Layout;
