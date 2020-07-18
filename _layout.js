import { React } from "./_deps.js";
import Header from "./_header.js";
const Layout = ({ title, content, publishedAt, updatedAt }) => (React.createElement("html", null,
    React.createElement("head", null,
        React.createElement("title", null, title),
        React.createElement("meta", { charSet: "utf-8" }),
        React.createElement("link", { rel: "stylesheet", href: "assets/index.css" })),
    React.createElement("body", null,
        React.createElement(Header, null),
        React.createElement("main", null, content))));
export default Layout;
