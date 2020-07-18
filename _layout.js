import { React } from "./_deps.js";
import Header from "./_header.js";
const Layout = ({ title, content, publishedAt, updatedAt }) => (React.createElement("html", null,
    React.createElement("head", null,
        React.createElement("title", null, title),
        React.createElement("meta", { charSet: "utf-8" }),
        React.createElement("link", { rel: "stylesheet", href: "assets/index.css" })),
    React.createElement("body", null,
        React.createElement(Header, null),
        React.createElement("main", null, content),
        React.createElement("div", null,
            "\u4F5C\u6210\u65E5: ",
            publishedAt ? publishedAt.toString() : ""),
        React.createElement("div", null,
            "\u66F4\u65B0\u65E5: ",
            updatedAt ? updatedAt.toString() : ""))));
export default Layout;
