import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "index.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "Hello Pagic!",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Hello Pagic!</h1>\n<p>Hello world!</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': null
};
