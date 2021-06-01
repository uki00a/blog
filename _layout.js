const Layout = ({ outputPath, title, content, config, head, }) => {
    var _a, _b;
    const isIndex = outputPath === "index.html";
    const pageTitle = isIndex
        ? "TOP | " + config.title
        : title + " | " + config.title;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("title", null, pageTitle),
            config.description && React.createElement("meta", { name: "description", content: config.description }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            React.createElement("meta", { property: "og:title", content: pageTitle }),
            config.description && React.createElement("meta", { property: "og:description", content: config.description }),
            React.createElement("meta", { property: "og:type", content: isIndex ? 'website' : 'article' }),
            React.createElement("meta", { name: "twitter:card", content: "summary" }),
            ((_b = (_a = config.blog) === null || _a === void 0 ? void 0 : _a.social) === null || _b === void 0 ? void 0 : _b.twitter) && React.createElement("meta", { name: "twitter:site", content: `@${config.blog.social.twitter}` }),
            head),
        React.createElement("body", null,
            React.createElement("header", null,
                React.createElement("div", null,
                    React.createElement("a", { href: `${config.root}index.html` }, "uki00a.github.io"))),
            React.createElement("main", null, content))));
};
export default Layout;
