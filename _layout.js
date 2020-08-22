import { React } from "./_deps.js";
function computeRelativePathToRootDir(outputPath) {
    const pathComponents = outputPath.split("/");
    return "../".repeat(pathComponents.length - 1);
}
const Layout = ({ outputPath, title, content, }) => {
    const rootDir = computeRelativePathToRootDir(outputPath);
    const linkToTopPage = `${rootDir}index.html`;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null, title),
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@exampledev/new.css@1/new.min.css" })),
        React.createElement("body", null,
            React.createElement("header", null,
                React.createElement("div", null,
                    React.createElement("a", { href: linkToTopPage }, "uki00a.github.io"))),
            React.createElement("main", null, content))));
};
export default Layout;
