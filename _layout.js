import { React } from "./_deps.js";
const URL = "https://uki00a.github.io/blog"; // TODO ローカル環境では`http://localhost:<port>`を設定できるようにする
const TOP_PAGE = "index.html";
const DEFAULT_DESCRIPTION = "uki00a.github.io";
const SITE_IMAGE = "avatar.png";
const Layout = ({ outputPath, title, content, }) => {
    const linkToTopPage = `${URL}/${TOP_PAGE}`;
    const favicon = `${URL}/assets/favicon.ico`;
    const ogImage = `${URL}/assets/${SITE_IMAGE}`;
    const ogType = outputPath.endsWith(TOP_PAGE) ? "website" : "article";
    const ogDescription = DEFAULT_DESCRIPTION; // TODO ページごとにdescriptionを変える
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null, title),
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("meta", { property: "og:title", content: title }),
            React.createElement("meta", { property: "og:description", content: ogDescription }),
            React.createElement("meta", { property: "og:type", content: ogType }),
            React.createElement("meta", { property: "og:image", content: ogImage }),
            React.createElement("meta", { name: "twitter:card", content: "summary" }),
            React.createElement("meta", { name: "twitter:site", content: "@uki00a" }),
            React.createElement("meta", { name: "twitter:creator", content: "@uki00a" }),
            React.createElement("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@exampledev/new.css@1/new.min.css" }),
            React.createElement("link", { rel: "icon", href: favicon })),
        React.createElement("body", null,
            React.createElement("header", null,
                React.createElement("div", null,
                    React.createElement("a", { href: linkToTopPage }, "uki00a.github.io"))),
            React.createElement("main", null, content))));
};
export default Layout;
