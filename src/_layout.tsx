import { React, PagicLayout } from "./_deps.tsx";
import Header from "./_header.tsx";

const Layout: PagicLayout = ({ title, content, publishedAt, updatedAt }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="assets/index.css" />
    </head>
    <body>
      <Header />
      <main>
      {content}
      </main>
      <div>作成日: {publishedAt ? publishedAt.toString() : ""}</div>
      <div>更新日: {updatedAt ? updatedAt.toString() : ""}</div>
    </body>
  </html>
);

export default Layout;