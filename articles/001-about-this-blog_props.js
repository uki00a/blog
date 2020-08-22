import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "articles/001-about-this-blog.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "articles/001-about-this-blog.html",
    'title': "このブログについて",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>このブログについて</h1>\n<h2 id="%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">使っている技術<a class="anchor" href="#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">§</a></h2>\n<p>このブログは<a href="https://github.com/xcatliu/pagic">pagic</a>というDenoで実装されたスタティックサイトジェネレータを使って作成しています。</p>\n<p>この記事を書いた時点でのバージョンは次の通りです。</p>\n<ul>\n<li>deno@v1.3.1</li>\n<li>pagic@v0.8.6</li>\n</ul>\n<h2 id="pagic%E3%81%A8%E3%81%AF%3F">pagicとは?<a class="anchor" href="#pagic%E3%81%A8%E3%81%AF%3F">§</a></h2>\n<ul>\n<li>Denoで実装されたスタティックサイトジェネレータ</li>\n<li>記事をReactコンポーネントまたはmarkdown形式で記述できる</li>\n<li>プラグインシステムにより拡張することが可能</li>\n</ul>\n<h2 id="%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">デプロイ<a class="anchor" href="#%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">§</a></h2>\n<p>GitHub Actionsを使って、ビルド及びデプロイを自動化しています。</p>\n<p><code>.github/workflows</code>ディレクトリ内に以下のようなyamlファイルを用意します。</p>\n<pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">name</span><span class="token punctuation">:</span> build\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build</span><span class="token punctuation">:</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> <a class="token email-link" href="mailto:actions/checkout@master">actions/checkout@master</a>\n    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> denolib/setup<span class="token punctuation">-</span><a class="token email-link" href="mailto:deno@master">deno@master</a>\n      <span class="token key atrule">with</span><span class="token punctuation">:</span>\n        <span class="token key atrule">deno-version</span><span class="token punctuation">:</span> 1.3.1\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build\n      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">\n        deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic@v0.8.6/mod.ts build</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy\n      <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3\n      <span class="token key atrule">with</span><span class="token punctuation">:</span>\n        <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n        <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./dist\n</code></pre>\n<p>これにより、masterブランチへのpush時に、以下の処理が実行されます。</p>\n<ol>\n<li><code>pagic build</code>による静的サイトの生成</li>\n<li><a href="https://github.com/peaceiris/actions-gh-pages">peaceiris/actions-gh-pages</a>によるGitHub Pagesへのデプロイ</li>\n</ol>\n<h2 id="%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">このサイトのソース<a class="anchor" href="#%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">§</a></h2>\n<p>https://github.com/uki00a/blog です。</p>'
        } }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93">使っている技術</a></li><li><a href="#pagic%E3%81%A8%E3%81%AF%3F">pagicとは?</a></li><li><a href="#%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4">デプロイ</a></li><li><a href="#%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9">このサイトのソース</a></li></ol></nav>'
        } }),
    'publishedAt': "2020-08-22T00:00:00.000Z",
    'updatedAt': "2020-08-22T00:00:00.000Z",
    'tags': [
        "pagic",
        "deno",
        "GitHubActions"
    ]
};
