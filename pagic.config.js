var _a;
const root = (_a = Deno.env.get("URL")) !== null && _a !== void 0 ? _a : "https://uki00a.github.io/blog/";
export default {
    srcDir: "./src",
    root,
    title: "uki00a.github.io",
    description: "uki00a.github.io",
    /*
    theme: "blog",
    plugins: ["blog"],
    */
    head: (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css" }),
        React.createElement("link", { rel: "icon", href: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/favicon.ico" }),
        React.createElement("meta", { property: "og:image", content: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png" }))),
    blog: {
        root: "/articles",
        social: {
            github: "uki00a",
            email: "uki00a@gmail.com",
            twitter: "uki00a",
        },
    },
    tools: {
        editOnGitHub: true,
        backToTop: true,
    },
    md: {
        tocEnabled: true,
    },
};
