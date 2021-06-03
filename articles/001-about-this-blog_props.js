import projectConfig from 'https://uki00a.github.io/blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "articles/001-about-this-blog.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/001-about-this-blog.html",
    'title': "このブログについて",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>このブログについて</h1>\n<h2 id="%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">使っている技術<a class="anchor" href="#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">§</a></h2>\n<p>このブログは<a href="https://github.com/xcatliu/pagic">pagic</a>を使って作成しています。</p>\n<p>この記事を書いた時点でのバージョンは次の通りです。</p>\n<ul>\n<li>deno@v1.3.1</li>\n<li>pagic@v0.8.6</li>\n</ul>\n<h2 id="pagic%E3%81%A8%E3%81%AF">pagicとは?<a class="anchor" href="#pagic%E3%81%A8%E3%81%AF">§</a></h2>\n<ul>\n<li>Denoで実装されたスタティックサイトジェネレータ</li>\n<li>記事をReactコンポーネントまたはmarkdown形式で記述できる</li>\n<li>プラグインシステムにより拡張することが可能</li>\n</ul>\n<h2 id="pagic%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9">pagicの使い方<a class="anchor" href="#pagic%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9">§</a></h2>\n<p>TBD</p>\n<h2 id="%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">デプロイ<a class="anchor" href="#%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">§</a></h2>\n<p>GitHub Actionsを使って、ビルド及びデプロイを自動化しています。</p>\n<p><code>.github/workflows</code>ディレクトリ内に以下のようなyamlファイルを用意します。</p>\n<pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">name</span><span class="token punctuation">:</span> build\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> <a class="token email-link" href="mailto:actions/checkout@master">actions/checkout@master</a>\n    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span><a class="token email-link" href="mailto:deno@master">deno@master</a>\n      <span class="token key atrule">with</span><span class="token punctuation">:</span>\n        <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> 1.3.1\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build\n      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">\n        deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic@v0.8.6/mod.ts build</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy\n      <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n      <span class="token key atrule">with</span><span class="token punctuation">:</span>\n        <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n        <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n</code></pre>\n<p>これにより、masterブランチへのpush時に、以下の処理が実行されます。</p>\n<ol>\n<li><code>pagic build</code>による静的サイトの生成</li>\n<li><a href="https://github.com/peaceiris/actions-gh-pages">peaceiris/actions-gh-pages</a>によるGitHub Pagesへのデプロイ</li>\n</ol>\n<h2 id="%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">このサイトのソース<a class="anchor" href="#%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">§</a></h2>\n<p><a href="https://github.com/uki00a/blog">https://github.com/uki00a/blog</a>に置いています</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css", rel: "stylesheet" }),
        React.createElement("link", { href: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/favicon.ico", rel: "icon" }),
        React.createElement("meta", { content: "https://raw.githubusercontent.com/uki00a/blog/master/src/assets/avatar.png", property: "og:image" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "https://uki00a.github.io/blog/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u3053\u306E\u30D6\u30ED\u30B0\u306B\u3064\u3044\u3066"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">使っている技術<a class="anchor" href="#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">§</a></h2>\n<p>このブログは<a href="https://github.com/xcatliu/pagic">pagic</a>を使って作成しています。</p>\n<p>この記事を書いた時点でのバージョンは次の通りです。</p>\n<ul>\n<li>deno@v1.3.1</li>\n<li>pagic@v0.8.6</li>\n</ul>\n<h2 id="pagic%E3%81%A8%E3%81%AF">pagicとは?<a class="anchor" href="#pagic%E3%81%A8%E3%81%AF">§</a></h2>\n<ul>\n<li>Denoで実装されたスタティックサイトジェネレータ</li>\n<li>記事をReactコンポーネントまたはmarkdown形式で記述できる</li>\n<li>プラグインシステムにより拡張することが可能</li>\n</ul>\n<h2 id="pagic%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9">pagicの使い方<a class="anchor" href="#pagic%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9">§</a></h2>\n<p>TBD</p>\n<h2 id="%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">デプロイ<a class="anchor" href="#%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">§</a></h2>\n<p>GitHub Actionsを使って、ビルド及びデプロイを自動化しています。</p>\n<p><code>.github/workflows</code>ディレクトリ内に以下のようなyamlファイルを用意します。</p>\n<pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">name</span><span class="token punctuation">:</span> build\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> <a class="token email-link" href="mailto:actions/checkout@master">actions/checkout@master</a>\n    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span><a class="token email-link" href="mailto:deno@master">deno@master</a>\n      <span class="token key atrule">with</span><span class="token punctuation">:</span>\n        <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> 1.3.1\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build\n      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">\n        deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic@v0.8.6/mod.ts build</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy\n      <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n      <span class="token key atrule">with</span><span class="token punctuation">:</span>\n        <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n        <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n</code></pre>\n<p>これにより、masterブランチへのpush時に、以下の処理が実行されます。</p>\n<ol>\n<li><code>pagic build</code>による静的サイトの生成</li>\n<li><a href="https://github.com/peaceiris/actions-gh-pages">peaceiris/actions-gh-pages</a>によるGitHub Pagesへのデプロイ</li>\n</ol>\n<h2 id="%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">このサイトのソース<a class="anchor" href="#%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">§</a></h2>\n<p><a href="https://github.com/uki00a/blog">https://github.com/uki00a/blog</a>に置いています</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93" }, "\u4F7F\u3063\u3066\u3044\u308B\u6280\u8853")),
            React.createElement("li", null,
                React.createElement("a", { href: "#pagic%E3%81%A8%E3%81%AF" }, "pagic\u3068\u306F?")),
            React.createElement("li", null,
                React.createElement("a", { href: "#pagic%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9" }, "pagic\u306E\u4F7F\u3044\u65B9")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4" }, "\u30C7\u30D7\u30ED\u30A4")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9" }, "\u3053\u306E\u30B5\u30A4\u30C8\u306E\u30BD\u30FC\u30B9")))),
    'author': "uki00a",
    'contributors': [
        "uki00a"
    ],
    'date': "2021-06-03T21:01:59.000Z",
    'updated': null,
    'excerpt': "使っている技術 このブログはpagicを使って作成しています。 この記事を書いた時点でのバージョンは次の通りです。 - deno@v1.3.1 - pagic@v0.8.6 pagicとは? - Denoで実装されたスタティックサイトジェネレータ - 記事をReact...",
    'cover': undefined,
    'publishDate': "2020-08-22T00:00:00.000Z",
    'tags': [
        "pagic",
        "deno",
        "GitHubActions"
    ]
};
