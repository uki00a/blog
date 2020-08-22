import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "articles/sample-1.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/sample-1.html",
    'title': "Sample 1",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Sample 1</h1>\n<p>テスト</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null,
    'publishedAt': "2020-07-18T00:00:00.000Z",
    'updatedAt': "2020-07-19T00:00:00.000Z"
};
