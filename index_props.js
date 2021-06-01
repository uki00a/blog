import projectConfig from 'https://uki00a.github.io/blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "index.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="posts">Posts<a class="anchor" href="#posts">§</a></h2>\n<ul>\n<li><a href="articles/002-how-to-use-rhysd-dotfiles.html">rhysd/dotfilesを使ってdotfilesリポジトリの管理を楽にする</a></li>\n<li><a href="articles/001-about-this-blog.html">このブログについて</a></li>\n</ul>\n<h2 id="%E3%83%AA%E3%83%B3%E3%82%AF">リンク<a class="anchor" href="#%E3%83%AA%E3%83%B3%E3%82%AF">§</a></h2>\n<ul>\n<li><a href="https://github.com/uki00a/blog">ソースコード</a></li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css", rel: "stylesheet" }),
        React.createElement("link", { href: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/favicon.ico", rel: "icon" }),
        React.createElement("meta", { content: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png", property: "og:image" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "https://uki00a.github.io/blog/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="posts">Posts<a class="anchor" href="#posts">§</a></h2>\n<ul>\n<li><a href="articles/002-how-to-use-rhysd-dotfiles.html">rhysd/dotfilesを使ってdotfilesリポジトリの管理を楽にする</a></li>\n<li><a href="articles/001-about-this-blog.html">このブログについて</a></li>\n</ul>\n<h2 id="%E3%83%AA%E3%83%B3%E3%82%AF">リンク<a class="anchor" href="#%E3%83%AA%E3%83%B3%E3%82%AF">§</a></h2>\n<ul>\n<li><a href="https://github.com/uki00a/blog">ソースコード</a></li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#posts" }, "Posts")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E3%83%AA%E3%83%B3%E3%82%AF" }, "\u30EA\u30F3\u30AF")))),
    'author': "Yuki Tanaka",
    'contributors': [
        "Yuki Tanaka"
    ],
    'date': "2021-06-01T21:05:51.000Z",
    'updated': null,
    'excerpt': "Posts - rhysd/dotfilesを使ってdotfilesリポジトリの管理を楽にする - このブログについて リンク - ソースコード",
    'cover': undefined
};
