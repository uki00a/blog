import { React, PagicLayout } from "./_deps.tsx";

function computeRelativePathToRootDir(outputPath: string): string {
  const pathComponents = outputPath.split("/");
  return "../".repeat(pathComponents.length - 1);
}

const Layout: PagicLayout = ({
  outputPath,
  title,
  content,
}) => {
  const rootDir = computeRelativePathToRootDir(outputPath);
  const linkToTopPage = `${rootDir}index.html`;
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1/new.min.css"></link>
      </head>
      <body>
        <header>
          <div>
            <a href={linkToTopPage}>タイトル</a>
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
