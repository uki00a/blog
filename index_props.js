import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "index.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "uki00a.github.io",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1><a href="http://uki00a.github.io">uki00a.github.io</a></h1>\n<ul>\n<li><a href="articles/002-how-to-use-rhysd-dotfiles.html">rhysd/dotfilesを使ってdotfilesリポジトリの管理を楽にする</a></li>\n<li><a href="articles/001-about-this-blog.html">このブログについて</a></li>\n</ul>\n<h2 id="%E3%83%AA%E3%83%B3%E3%82%AF">リンク<a class="anchor" href="#%E3%83%AA%E3%83%B3%E3%82%AF">§</a></h2>\n<ul>\n<li><a href="https://github.com/uki00a/blog">ソースコード</a></li>\n</ul>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E3%83%AA%E3%83%B3%E3%82%AF">リンク</a></li></ol></nav>'
        } })
};
