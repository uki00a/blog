import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "about.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "about.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E3%81%93%E3%81%AE%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">このブログについて<a class="anchor" href="#%E3%81%93%E3%81%AE%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">§</a></h2>\n<p>このブログは以下のOSSを使用して構築されています。</p>\n<ul>\n<li><a href="https://github.com/xcatliu/pagic">pagic</a></li>\n</ul>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E3%81%93%E3%81%AE%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">このブログについて</a></li></ol></nav>'
        } })
};
