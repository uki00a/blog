import { React, PagicLayout } from "pagic";

const Layout: PagicLayout = ({
  outputPath,
  title,
  content,
  config,
  head,
}) => {
  const isIndex = outputPath === "index.html"
  const pageTitle = isIndex
    ? "TOP | " + config.title
    : title + " | " + config.title;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        {config.description && <meta name="description" content={config.description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        {config.description && <meta property="og:description" content={config.description} />}
        {<meta property="og:type" content={isIndex ? 'website' : 'article'} />}
        <meta name="twitter:card" content="summary" />
        {config.blog?.social?.twitter && <meta name="twitter:site" content={`@${config.blog.social.twitter}`} />}
        {head}
      </head>
      <body>
        <header>
          <div>
            <a href={`${config.root}index.html`}>uki00a.github.io</a>
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
