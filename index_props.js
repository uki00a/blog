import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "blog",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>blog</h1>\n<p>このブログは<a href="https://github.com/xcatliu/pagic">pagic</a>を使用して生成されています。</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
